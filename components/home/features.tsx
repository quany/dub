import Link from "next/link";
import {
  Airplay,
  Chart,
  QR,
  Users,
  Link as LinkIcon,
  Photo,
} from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { useState } from "react";
import Accordion from "@/components/shared/accordion";
import { AnimatePresence, motion } from "framer-motion";
import { useLinkQRModal } from "../app/modals/link-qr-modal";
import { DEFAULT_LINK_PROPS } from "@/lib/constants";
import { useAddEditLinkModal } from "../app/modals/add-edit-link-modal";

const featureList = [
  {
    key: "analytics",
    title: "重要的分析",
    icon: <Chart className="h-5 w-5 text-gray-600" />,
    description:
      "Dub 为您的链接提供强大的分析，包括地理位置、设备、浏览器和引用信息。",
    cta: (
      <Link
        href={{ pathname: "/", query: { key: "github" } }}
        as="/stats/github"
        shallow
        scroll={false}
        className="block max-w-fit rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black"
      >
        查看演示
      </Link>
    ),
    demo: "https://d2vwwcvoksz7ty.cloudfront.net/analytics.mp4",
    thumbnail: "/_static/features/analytics.png",
  },
  {
    key: "domains",
    title: "使用您自己的域名",
    icon: <Airplay className="h-5 w-5 text-gray-600" />,
    description:
      "Dub 为所有计划提供免费的自定义域 - 立即开始个性化您的链接。",
    cta: (
      <a
        href="https://app.l0l.ink"
        target="_blank"
        rel="noreferrer"
        className="block max-w-fit rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black"
      >
        创建项目
      </a>
    ),
    demo: "https://d2vwwcvoksz7ty.cloudfront.net/custom-domain.mp4",
  },
  {
    key: "link",
    title: "强大的链接生成器",
    icon: <LinkIcon className="h-5 w-5 text-gray-600" />,
    description:
      "使用 UTM 参数、密码保护、到期日期、iOS/Android 目标等构建您的链接。",
    cta: "查看演示", //custom cta
    demo: "https://d2vwwcvoksz7ty.cloudfront.net/link.mp4",
  },
  {
    key: "social",
    title: "自定义社交媒体卡片",
    icon: <Photo className="h-5 w-5 text-gray-600" />,
    description:
      "在您的链接上叠加自定义 OG 图像，使它们在社交媒体上脱颖而出。",
    cta: "查看演示", //custom cta
    demo: "https://d2vwwcvoksz7ty.cloudfront.net/og.mp4",
  },
  {
    key: "qr",
    title: "免费二维码生成器",
    icon: <QR className="h-5 w-5 text-gray-600" />,
    description:
      "QR 码和短链接就像豆荚里的豌豆。 这就是我们在 Dub 中内置二维码生成器的原因。",
    cta: "查看演示", //custom cta
    demo: "https://d2vwwcvoksz7ty.cloudfront.net/qr.mp4",
  },
  {
    key: "team",
    title: "与您的团队协作",
    icon: <Users className="h-5 w-5 text-gray-600" />,
    description:
      "使用 Dub，您可以免费邀请无限的团队成员来协作处理您的项目 - 不再通过 Google 群组共享登录信息。",
    cta: (
      <a
        href="https://app.l0l.ink"
        target="_blank"
        rel="noreferrer"
        className="block max-w-fit rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black"
      >
        邀请你的队友
      </a>
    ),
    demo: "https://d2vwwcvoksz7ty.cloudfront.net/team.mp4",
  },
];

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);

  const { setShowAddEditLinkModal, AddEditLinkModal } = useAddEditLinkModal({
    props: DEFAULT_LINK_PROPS,
    homepageDemo: true,
  });
  const { setShowLinkQRModal, LinkQRModal } = useLinkQRModal({
    props: {
      key: "github",
      url: "https://github.com/steven-tey/dub",
    },
  });
  return (
    <div id="features">
      <AddEditLinkModal />
      <LinkQRModal />
      {featureList.map(({ key, demo }) => (
        // preload videos
        <link key={key} rel="preload" as="video" href={demo} />
      ))}
      <MaxWidthWrapper className="py-10">
        <div className="mx-auto max-w-md text-center sm:max-w-xl">
          <h2 className="font-display text-4xl font-extrabold leading-tight text-black sm:text-5xl sm:leading-tight">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            强大的
            </span>{" "}
            功能{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            现代的
            </span>{" "}
            营销团队
          </h2>
          <p className="mt-5 text-gray-600 sm:text-lg">
          Dub 不仅仅是一个链接缩短器。 我们构建了一套强大的功能，让您拥有强大的营销能力。
          </p>
        </div>

        <div className="my-10 h-[840px] w-full overflow-hidden rounded-xl border border-gray-200 bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur lg:h-[630px]">
          <div className="grid grid-cols-1 gap-10 p-5 lg:grid-cols-3">
            <Accordion
              items={featureList.map(
                ({ key, title, icon, description, cta }) => ({
                  trigger: (
                    <div className="flex items-center space-x-3 p-3">
                      {icon}
                      <h3 className="text-base font-semibold text-gray-600">
                        {title}
                      </h3>
                    </div>
                  ),
                  content: (
                    <div className="p-3">
                      <p className="mb-4 text-sm text-gray-500">
                        {description}
                      </p>
                      {key === "link" || key === "social" ? (
                        <button
                          onClick={() => setShowAddEditLinkModal(true)}
                          className="block max-w-fit rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black"
                        >
                          查看演示
                        </button>
                      ) : key === "qr" ? (
                        <button
                          onClick={() => setShowLinkQRModal(true)}
                          className="block max-w-fit rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black"
                        >
                          查看演示
                        </button>
                      ) : (
                        cta
                      )}
                    </div>
                  ),
                }),
              )}
              activeTab={activeFeature}
              setActiveTab={setActiveFeature}
            />
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {featureList.map((feature, index) => {
                  if (index === activeFeature) {
                    return (
                      <motion.div
                        key={feature.title}
                        initial={{
                          y: 10,
                          opacity: 0,
                        }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{
                          y: -10,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.15,
                          stiffness: 300,
                          damping: 30,
                        }}
                        className="relative min-h-[600px] w-full overflow-hidden whitespace-nowrap rounded-2xl bg-white shadow-2xl lg:mt-10 lg:w-[800px]"
                      >
                        <video
                          autoPlay
                          muted
                          loop
                          width={800}
                          height={600}
                          poster={feature.thumbnail}
                        >
                          <source src={feature.demo} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </motion.div>
                    );
                  }
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
