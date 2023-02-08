import { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from "crypto-js";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    // 推送消息
    if (req.method === "POST") {

    }
    // 验证URL有效性
    if (req.method === "GET") {
        console.log('req url:', req.url);
        console.log('req query:', req.query);
        const { echostr } = req.query as { echostr: string };
        const msg = CryptoJS.AES.decrypt(CryptoJS.enc.Utf8.parse(echostr), '5xIKGoUYc3JwDWjhajNGBnUlomEJDJ45GV6eKobVcPu').toString(CryptoJS.enc.Utf8);

        console.log('decrypt content: ', msg);

        const content = msg.substr(20).replace('ww83dbce36bd5a5696', '');

        console.log('content:', content);

        // 在1秒内原样返回明文消息内容(不能加引号，不能带bom头，不能带换行符)
        res.end(content);
    }
}