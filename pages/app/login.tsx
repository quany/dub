import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Meta from "@/components/layout/meta";
import BlurImage from "@/components/shared/blur-image";
import { LoadingDots } from "@/components/shared/icons";
import Background from "@/components/shared/background";

export default function Login() {
  const [signInClicked, setSignInClicked] = useState(false);
  const [noSuchAccount, setNoSuchAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [buttonText, setButtonText] = useState("发送登录链接");

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <Meta title="Sign in to Dub" />
      <Background />
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <a href="https://l0l.ink">
            <BlurImage
              src="/_static/logo.png"
              alt="l0l.ink logo"
              className="h-10 w-10 rounded-full"
              width={20}
              height={20}
            />
          </a>
          <h3 className="text-xl font-semibold">登录</h3>
          <p className="text-sm text-gray-500">
          使用您的电子邮件地址登录。
          </p>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setSignInClicked(true);
            fetch("/api/auth/account-exists", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            }).then(async (res) => {
              const { exists } = await res.json();
              if (exists) {
                signIn("email", {
                  email,
                  redirect: false,
                }).then((res) => {
                  setSignInClicked(false);
                  if (res?.ok && !res?.error) {
                    setEmail("");
                    setButtonText("电子邮件已发送 - 检查您的收件箱！");
                  } else {
                    setButtonText("发送电子邮件时出错 - 再试一次？");
                  }
                });
              } else {
                setNoSuchAccount(true);
                setSignInClicked(false);
              }
            });
          }}
          className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
        >
          <div>
            <label htmlFor="email" className="block text-xs text-gray-600">
              邮件地址
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="panic@thedis.co"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setNoSuchAccount(false);
                setEmail(e.target.value);
              }}
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
          <button
            disabled={signInClicked}
            className={`${
              signInClicked
                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                : "border-black bg-black text-white hover:bg-white hover:text-black"
            } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
          >
            {signInClicked ? (
              <LoadingDots color="#808080" />
            ) : (
              <p>{buttonText}</p>
            )}
          </button>
          {noSuchAccount ? (
            <p className="text-center text-sm text-red-500">
              没有这样的账户。{" "}
              <Link href="/register" className="font-semibold text-red-600">
                注册
              </Link>
            </p>
          ) : (
            <p className="text-center text-sm text-gray-600">
              没有账户?{" "}免费
              <Link href="/register" className="font-semibold text-gray-800">
                注册
              </Link>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
