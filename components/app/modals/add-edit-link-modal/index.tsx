import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  UIEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { mutate } from "swr";
import { useDebounce } from "use-debounce";
import BlurImage from "@/components/shared/blur-image";
import {
  AlertCircleFill,
  LoadingCircle,
  LoadingDots,
  Lock,
  Random,
  X,
} from "@/components/shared/icons";
import Modal from "@/components/shared/modal";
import Tooltip, { TooltipContent } from "@/components/shared/tooltip";
import useProject from "@/lib/swr/use-project";
import useUsage from "@/lib/swr/use-usage";
import { LinkProps } from "@/lib/types";
import {
  getApexDomain,
  getQueryString,
  getUrlWithoutUTMParams,
  linkConstructor,
} from "@/lib/utils";
import ExpirationSection from "./expiration-section";
import OGSection from "./og-section";
import PasswordSection from "./password-section";
import UTMSection from "./utm-section";
import IOSSection from "./ios-section";
import Preview from "./preview";
import AndroidSection from "./android-section";
import { DEFAULT_LINK_PROPS } from "@/lib/constants";

function AddEditLinkModal({
  showAddEditLinkModal,
  setShowAddEditLinkModal,
  props,
  hideXButton,
  homepageDemo,
}: {
  showAddEditLinkModal: boolean;
  setShowAddEditLinkModal: Dispatch<SetStateAction<boolean>>;
  props?: LinkProps;
  hideXButton?: boolean;
  homepageDemo?: boolean;
}) {
  const router = useRouter();
  const { slug } = router.query as { slug: string };
  const { project: { domain } = {} } = useProject();

  const [keyExistsError, setKeyExistsError] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [generatingSlug, setGeneratingSlug] = useState(false);
  const [saving, setSaving] = useState(false);

  const [data, setData] = useState<LinkProps>(
    props || {
      ...DEFAULT_LINK_PROPS,
      domain: domain || "",
      key: "",
      url: "",
    },
  );
  const { key, url, password, proxy } = data;

  const [debouncedKey] = useDebounce(key, 500);
  useEffect(() => {
    if (debouncedKey.length > 0 && debouncedKey !== props?.key) {
      fetch(
        domain
          ? `/api/projects/${slug}/domains/${domain}/links/${debouncedKey}/exists`
          : `/api/links/${debouncedKey}/exists`,
      ).then(async (res) => {
        if (res.status === 200) {
          const exists = await res.json();
          setKeyExistsError(exists);
        }
      });
    }
  }, [debouncedKey]);

  const generateRandomSlug = useCallback(async () => {
    setGeneratingSlug(true);
    const res = await fetch(
      domain
        ? `/api/projects/${slug}/domains/${domain}/links/random`
        : `/api/links/random`,
    );
    const key = await res.json();
    setData((prev) => ({ ...prev, key }));
    setGeneratingSlug(false);
  }, []);

  const [generatingMetatags, setGeneratingMetatags] = useState(
    props ? true : false,
  );
  const [debouncedUrl] = useDebounce(getUrlWithoutUTMParams(url), 500);
  useEffect(() => {
    // if there's a password, no need to generate metatags
    if (password) {
      setData((prev) => ({
        ...prev,
        title: "要求输入密码",
        description: "此链接受密码保护。 请输入密码查看。",
        image: "/_static/password-protected.png",
      }));
      return;
    }
    /**
     * Only generate metatags if:
     * - modal is open
     * - custom OG proxy is not enabled
     **/
    if (showAddEditLinkModal && !proxy) {
      setData((prev) => ({
        ...prev,
        title: null,
        description: null,
        image: null,
      }));
      try {
        // if url is valid, continue to generate metatags, else return null
        new URL(debouncedUrl);
        setGeneratingMetatags(true);
        fetch(`/api/edge/metatags?url=${debouncedUrl}`).then(async (res) => {
          if (res.status === 200) {
            const results = await res.json();
            setData((prev) => ({ ...prev, ...results }));
          }
          // set timeout to prevent flickering
          setTimeout(() => setGeneratingMetatags(false), 200);
        });
      } catch (e) {
        console.log("not a valid url");
      }
    } else {
      setGeneratingMetatags(false);
    }
  }, [debouncedUrl, password, showAddEditLinkModal, proxy]);

  const logo = useMemo(() => {
    if (password || (!debouncedUrl && !props)) {
      return "/_static/logo.png";
    } else {
      return `https://www.google.com/s2/favicons?sz=64&domain_url=${getApexDomain(
        debouncedUrl || props.url,
      )}`;
    }
  }, [password, debouncedUrl, props]);

  const endpoint = useMemo(() => {
    if (props?.key) {
      return {
        method: "PUT",
        url: domain
          ? `/api/projects/${slug}/domains/${domain}/links/${props.key}`
          : `/api/links/${props.key}`,
      };
    } else {
      return {
        method: "POST",
        url: domain
          ? `/api/projects/${slug}/domains/${domain}/links`
          : `/api/links`,
      };
    }
  }, [props]);

  const [atBottom, setAtBottom] = useState(false);
  const handleScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (Math.abs(scrollHeight - scrollTop - clientHeight) < 5) {
      setAtBottom(true);
    } else {
      setAtBottom(false);
    }
  }, []);

  const saveDisabled = useMemo(() => {
    /* 
      Disable save if:
      - modal is not open
      - saving is in progress
      - key is invalid
      - url is invalid
      - for an existing link, there's no changes
    */
    if (
      !showAddEditLinkModal ||
      saving ||
      keyExistsError ||
      urlError ||
      (props &&
        Object.entries(props).every(([key, value]) => data[key] === value))
    ) {
      return true;
    } else {
      return false;
    }
  }, [saving, keyExistsError, urlError, props, data, showAddEditLinkModal]);

  const randomIdx = Math.floor(Math.random() * 100);

  const [lockKey, setLockKey] = useState(false);
  useEffect(() => {
    if (props?.key) {
      setLockKey(true);
    }
  }, [props?.key]);

  return (
    <Modal
      showModal={showAddEditLinkModal}
      setShowModal={setShowAddEditLinkModal}
      closeWithX={homepageDemo ? false : true}
    >
      <div className="relative grid max-h-[min(906px,_90vh)] w-full divide-x divide-gray-100 overflow-scroll bg-white shadow-xl transition-all scrollbar-hide sm:max-w-screen-lg sm:grid-cols-2 sm:rounded-2xl sm:border sm:border-gray-200">
        {!hideXButton && !homepageDemo && (
          <button
            onClick={() => setShowAddEditLinkModal(false)}
            className="group absolute top-0 right-0 z-20 m-3 hidden rounded-full p-2 text-gray-500 transition-all duration-75 hover:bg-gray-100 focus:outline-none active:bg-gray-200 sm:block"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <div
          className="rounded-l-2xl sm:max-h-[min(906px,_90vh)] sm:overflow-scroll"
          onScroll={handleScroll}
        >
          <div className="z-10 flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 pt-8 pb-8 transition-all sm:sticky sm:top-0 sm:px-16">
            <BlurImage
              src={logo}
              alt="Logo"
              className="h-10 w-10 rounded-full"
              width={20}
              height={20}
            />
            <h3 className="text-lg font-medium">
              {props
                ? `Edit ${linkConstructor({
                    key: props.key,
                    domain,
                    pretty: true,
                  })}`
                : "Add a new link"}
            </h3>
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setSaving(true);
              fetch(endpoint.url, {
                method: endpoint.method,
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }).then((res) => {
                setSaving(false);
                if (res.status === 200) {
                  mutate(
                    domain
                      ? `/api/projects/${slug}/domains/${domain}/links${getQueryString(
                          router,
                        )}`
                      : `/api/links${getQueryString(router)}`,
                  );
                  if (router.asPath === "/welcome") {
                    router.push("/links").then(() => {
                      setShowAddEditLinkModal(false);
                    });
                  } else {
                    setShowAddEditLinkModal(false);
                  }
                } else if (res.status === 403) {
                  setKeyExistsError(true);
                } else if (res.status === 400) {
                  setUrlError(true);
                } else {
                  alert("出了些问题");
                }
              });
            }}
            className="grid gap-6 bg-gray-50 pt-8"
          >
            <div className="grid gap-6 px-4 sm:px-16">
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={`url-${randomIdx}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    目标网址
                  </label>
                  {urlError && (
                    <p className="text-sm text-red-600" id="key-error">
                      无效的网址。
                    </p>
                  )}
                </div>
                <div className="relative mt-1 flex rounded-md shadow-sm">
                  <input
                    name="url"
                    id={`url-${randomIdx}`}
                    type="url"
                    required
                    placeholder="https://github.com/steven-tey/dub"
                    value={url}
                    onChange={(e) => {
                      setUrlError(false);
                      setData({ ...data, url: e.target.value });
                    }}
                    className={`${
                      urlError
                        ? "border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500"
                    } block w-full rounded-md text-sm focus:outline-none`}
                    aria-invalid="true"
                  />
                  {urlError && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <AlertCircleFill
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={`key-${randomIdx}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    短链接
                  </label>
                  {lockKey ? (
                    <button
                      className="flex items-center space-x-2 text-sm text-gray-500 transition-all duration-75 hover:text-black active:scale-95"
                      type="button"
                      onClick={() => {
                        window.confirm(
                          "编辑现有的短链接将导致链接断开并重置其分析。 你确定你要继续吗？",
                        ) && setLockKey(false);
                      }}
                    >
                      <Lock className="h-3 w-3" />
                      <p>Unlock</p>
                    </button>
                  ) : (
                    <button
                      className="flex items-center space-x-2 text-sm text-gray-500 transition-all duration-75 hover:text-black active:scale-95"
                      onClick={generateRandomSlug}
                      disabled={generatingSlug}
                      type="button"
                    >
                      {generatingSlug ? (
                        <LoadingCircle />
                      ) : (
                        <Random className="h-3 w-3" />
                      )}
                      <p>{generatingSlug ? "生成" : "随机生成"}</p>
                    </button>
                  )}
                </div>
                <div className="relative mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center whitespace-nowrap rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-5 text-sm text-gray-500">
                    {domain || "l0l.ink"}
                  </span>
                  {lockKey ? (
                    <div className="block w-full cursor-not-allowed select-none rounded-r-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-500">
                      {props.key}
                    </div>
                  ) : (
                    <input
                      type="text"
                      name="key"
                      id={`key-${randomIdx}`}
                      required
                      pattern="[\p{Letter}\p{Mark}\d-]+" // Unicode regex to match characters from all languages and numbers (and omit all symbols except for dashes)
                      className={`${
                        keyExistsError
                          ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500"
                      } block w-full rounded-r-md pr-10 text-sm focus:outline-none`}
                      placeholder="github"
                      value={key}
                      onChange={(e) => {
                        setKeyExistsError(false);
                        setData({ ...data, key: e.target.value });
                      }}
                      aria-invalid="true"
                      aria-describedby="key-error"
                    />
                  )}
                  {keyExistsError && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <AlertCircleFill
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
                {keyExistsError && (
                  <p className="mt-2 text-sm text-red-600" id="key-error">
                    短链接已被使用。
                  </p>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="relative py-5">
              <div
                className="absolute inset-0 flex items-center px-4 sm:px-16"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gray-50 px-2 text-sm text-gray-500">
                  选项
                </span>
              </div>
            </div>

            <div className="grid gap-5 px-4 sm:px-16">
              <OGSection
                {...{ props, data, setData }}
                generatingMetatags={generatingMetatags}
              />
              <UTMSection {...{ props, data, setData }} />
              <PasswordSection {...{ props, data, setData }} />
              <ExpirationSection {...{ props, data, setData }} />
              <IOSSection {...{ props, data, setData }} />
              <AndroidSection {...{ props, data, setData }} />
            </div>

            <div
              className={`${
                atBottom ? "" : "sm:shadow-[0_-20px_30px_-10px_rgba(0,0,0,0.1)]"
              } z-10 bg-gray-50 px-4 py-8 transition-all sm:sticky  sm:bottom-0 sm:px-16`}
            >
              {homepageDemo ? (
                <Tooltip content="这是一个演示链接。你不能编辑它。" fullWidth>
                  <button
                    disabled={true}
                    className=" flex h-10 w-full cursor-not-allowed items-center justify-center rounded-md border border-gray-200 bg-gray-100 text-sm text-gray-400 transition-all focus:outline-none"
                  >
                    <p className="text-sm">保存更改</p>
                  </button>
                </Tooltip>
              ) : (
                <button
                  disabled={saveDisabled}
                  className={`${
                    saveDisabled
                      ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                      : "border-black bg-black text-white hover:bg-white hover:text-black"
                  } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
                >
                  {saving ? (
                    <LoadingDots color="#808080" />
                  ) : (
                    <p className="text-sm">{props ? "保存更改" : "添加链接"}</p>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="rounded-r-2xl sm:max-h-[min(906px,_90vh)] sm:overflow-scroll">
          <Preview data={data} generatingMetatags={generatingMetatags} />
        </div>
      </div>
    </Modal>
  );
}

function AddEditLinkButton({
  setShowAddEditLinkModal,
}: {
  setShowAddEditLinkModal: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { slug } = router.query as { slug?: string };

  const { isOwner } = useProject();
  const { exceededUsage } = useUsage();

  return slug && exceededUsage ? ( // only show exceeded usage tooltip if user is on a project page
    <Tooltip
      content={
        <TooltipContent
          title={
            isOwner
              ? "您已超出使用限制。 我们仍在收集有关您现有链接的数据，但您需要升级才能添加更多链接。"
              : "此项目的所有者已超出其使用限制。 我们仍在收集所有现有链接的数据，但他们需要升级他们的计划以添加更多链接。"
          }
          cta={isOwner && "升级"}
          ctaLink={isOwner && "/settings"}
        />
      }
    >
      <div className="cursor-not-allowed rounded-md border border-gray-200 px-5 py-2 text-sm font-medium text-gray-300 transition-all duration-75">
        Add
      </div>
    </Tooltip>
  ) : (
    <button
      onClick={() => setShowAddEditLinkModal(true)}
      className="rounded-md border border-black bg-black px-5 py-2 text-sm font-medium text-white transition-all duration-75 hover:bg-white hover:text-black active:scale-95"
    >
      Add
    </button>
  );
}

export function useAddEditLinkModal({
  props,
  hideXButton,
  homepageDemo,
}: {
  props?: LinkProps;
  hideXButton?: boolean;
  homepageDemo?: boolean;
}) {
  const [showAddEditLinkModal, setShowAddEditLinkModal] = useState(false);

  const AddEditLinkModalCallback = useCallback(() => {
    return (
      <AddEditLinkModal
        showAddEditLinkModal={showAddEditLinkModal}
        setShowAddEditLinkModal={setShowAddEditLinkModal}
        props={props}
        hideXButton={hideXButton}
        homepageDemo={homepageDemo}
      />
    );
  }, [
    showAddEditLinkModal,
    setShowAddEditLinkModal,
    props,
    hideXButton,
    homepageDemo,
  ]);

  const AddEditLinkButtonCallback = useCallback(() => {
    return (
      <AddEditLinkButton setShowAddEditLinkModal={setShowAddEditLinkModal} />
    );
  }, [setShowAddEditLinkModal]);

  return useMemo(
    () => ({
      showAddEditLinkModal,
      setShowAddEditLinkModal,
      AddEditLinkModal: AddEditLinkModalCallback,
      AddEditLinkButton: AddEditLinkButtonCallback,
    }),
    [
      showAddEditLinkModal,
      setShowAddEditLinkModal,
      AddEditLinkModalCallback,
      AddEditLinkButtonCallback,
    ],
  );
}
