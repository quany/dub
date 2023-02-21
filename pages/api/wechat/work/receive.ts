import { NextRequest } from "next/server";
import CryptoJS from "crypto-js";

export const config = {
    runtime: "experimental-edge",
};

export default async function handler(
    req: NextRequest
) {
    // 推送消息
    if (req.method === "POST") {
        const data = await fetch(`https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${process.env.WECHAT_WORK_CORPID}&corpsecret=${process.env.WECHAT_WORK_SHORT_CROPSCRET}`);
        console.log(data);
        const ss = await data.json();
        console.log(ss);
        const token = ss.token;
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "to": {
                "emails": [
                    "quany@l0l.ink"
                ],
                "userids": []
            },
            "cc": {
                "emails": [],
                "userids": []
            },
            "bcc": {
                "emails": [],
                "userids": []
            },
            "subject": "这是标题",
            "content": "这是邮件正文",
            "attachment_list": []
        });

        const response = await fetch(`https://qyapi.weixin.qq.com/cgi-bin/exmail/app/compose_send?access_token=${token}`, {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        });

        const result = await response.text();

        console.log(result);


        return new Response(result, {
            status: 200,
        });
    }
    // 验证URL有效性
    if (req.method === "GET") {
        console.log('req', req);
        console.log('req url:', req.url);
        console.log('req nextUrl:', req.nextUrl);
        const echostr = req.nextUrl.searchParams.get("echostr");
        // const { echostr } = req.query as { echostr: string };
        console.log('echostr:', echostr)
        const msg = CryptoJS.AES.decrypt(CryptoJS.enc.Utf8.parse(echostr), process.env.WECHAT_WORK_SHORT_AES_KEY).toString(CryptoJS.enc.Utf8);

        console.log('decrypt content: ', msg);

        const content = msg.substr(20).replace(process.env.WECHAT_WORK_CORPID, '');

        console.log('content:', content);

        // 在1秒内原样返回明文消息内容(不能加引号，不能带bom头，不能带换行符)
        // res.end(content);
        return new Response(content, {
            status: 200,
        });
    }
}