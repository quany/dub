import { nFormatter } from "@/lib/utils";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import Tweet from "@/components/shared/tweet";

export default function Testimonials({
  userCount,
  tweets,
}: {
  userCount: number;
  tweets: any[];
}) {
  return (
    <MaxWidthWrapper className="pt-20">
      <div className="mx-auto max-w-md text-center sm:max-w-xl">
        <h2 className="font-display text-4xl font-extrabold leading-tight text-black sm:text-5xl sm:leading-tight">
        被爱着{" "}
          <span className="bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
            {nFormatter(userCount)} 用户
          </span>
        </h2>
        <p className="mt-5 text-gray-600 sm:text-lg">
        不要从我们这里拿走它 - 这是我们的用户对 Dub 的评价。
        </p>
      </div>
      <div className="space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
        {tweets.map((tweet, idx) => (
          <Tweet
            key={tweet.id}
            id={tweet.id}
            metadata={JSON.stringify(tweet)}
            className={
              idx < Math.floor(tweets.length / 3) ||
              idx >= Math.floor(tweets.length / 3) * 2
                ? "relative lg:top-16"
                : ""
            }
          />
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
