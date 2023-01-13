import { useState } from "react";
import { DomainVerificationStatusProps } from "@/lib/types";
import { getSubdomain } from "@/lib/utils";

export const InlineSnippet = ({ children }: { children: string }) => {
  return (
    <span className="inline-block rounded-md bg-blue-100 px-1 py-0.5 font-mono text-blue-900">
      {children}
    </span>
  );
};

export default function DomainConfiguration({
  data,
}: {
  data: { status: DomainVerificationStatusProps; response: any };
}) {
  const { domainJson } = data.response;
  const subdomain = getSubdomain(domainJson.name, domainJson.apexName);
  const [recordType, setRecordType] = useState(!!subdomain ? "CNAME" : "A");

  if (data.status === "Pending Verification") {
    const txtVerification = domainJson.verification.find(
      (x: any) => x.type === "TXT",
    );
    return (
      <div className="border-t border-gray-200 pt-5">
        <p className="text-sm">
        请设置以下TXT记录{" "}
          <InlineSnippet>{domainJson.apexName}</InlineSnippet> 证明所有权 <InlineSnippet>{domainJson.name}</InlineSnippet>:
        </p>
        <div className="my-5 flex items-start justify-start space-x-10 rounded-md bg-gray-50 p-2">
          <div>
            <p className="text-sm font-bold">类型</p>
            <p className="mt-2 font-mono text-sm">{txtVerification.type}</p>
          </div>
          <div>
            <p className="text-sm font-bold">名称</p>
            <p className="mt-2 font-mono text-sm">
              {txtVerification.domain.slice(
                0,
                txtVerification.domain.length - domainJson.apexName.length - 1,
              )}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold">值</p>
            <p className="mt-2 font-mono text-sm">
              <span className="text-ellipsis">{txtVerification.value}</span>
            </p>
          </div>
        </div>
        <p className="text-sm">
        警告：如果您将此域用于另一个站点，设置此 TXT 记录会将域所有权从该站点转移并破坏它。 设置此记录时请谨慎行事。
        </p>
      </div>
    );
  }

  if (data.status === "Unknown Error") {
    return (
      <div className="border-t border-gray-200 pt-5">
        <p className="mb-5 text-sm">{data.response.domainJson.error.message}</p>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-200 pt-5">
      <div className="flex justify-start space-x-4">
        <button
          onClick={() => setRecordType("A")}
          className={`${
            recordType == "A"
              ? "border-black text-black"
              : "border-white text-gray-400"
          } ease border-b-2 pb-1 text-sm transition-all duration-150`}
        >
          A Record{!subdomain && " (recommended)"}
        </button>
        <button
          onClick={() => setRecordType("CNAME")}
          className={`${
            recordType == "CNAME"
              ? "border-black text-black"
              : "border-white text-gray-400"
          } ease border-b-2 pb-1 text-sm transition-all duration-150`}
        >
          CNAME Record{subdomain && " (recommended)"}
        </button>
      </div>
      <div className="my-3 text-left">
        <p className="my-5 text-sm">
          To configure your {recordType === "A" ? "apex domain" : "subdomain"} (
          <InlineSnippet>
            {recordType === "A" ? domainJson.apexName : domainJson.name}
          </InlineSnippet>
          ), set the following {recordType} record on your DNS provider to
          continue:
        </p>
        <div className="flex items-center justify-start space-x-10 rounded-md bg-gray-50 p-2">
          <div>
            <p className="text-sm font-bold">类型</p>
            <p className="mt-2 font-mono text-sm">{recordType}</p>
          </div>
          <div>
            <p className="text-sm font-bold">名称</p>
            <p className="mt-2 font-mono text-sm">
              {recordType === "A" ? "@" : subdomain ?? "www"}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold">值</p>
            <p className="mt-2 font-mono text-sm">
              {recordType === "A" ? `76.76.21.21` : `cname.l0l.ink`}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold">TTL</p>
            <p className="mt-2 font-mono text-sm">86400</p>
          </div>
        </div>
        <p className="mt-5 text-sm">
        注意：对于 TTL，如果不是  <InlineSnippet>86400</InlineSnippet> 
           可用，设置可能的最高值。 此外，域传播最多可能需要一个小时。
        </p>
      </div>
    </div>
  );
}
