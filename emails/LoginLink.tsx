import {
  Mjml,
  MjmlBody,
  MjmlColumn,
  MjmlSection,
  MjmlText,
  MjmlWrapper,
} from "mjml-react";
import ButtonPrimary from "./components/ButtonPrimary";
import Divider from "./components/Divider";
import Footer from "./components/Footer";
import Head from "./components/Head";
import Header from "./components/Header";
import { purple } from "./components/theme";

export default function LoginLink({ url }: { url: string }): JSX.Element {
  return (
    <Mjml>
      <Head />
      <MjmlBody width={500}>
        <MjmlWrapper cssClass="container">
          <Header title="您的登录链接" />
          <MjmlSection cssClass="smooth">
            <MjmlColumn>
              <MjmlText cssClass="paragraph">欢迎来到 l0l!</MjmlText>
              <MjmlText cssClass="paragraph">
                请单击下面的魔术链接登录您的帐户。请单击下面的魔术链接登录您的帐户。
              </MjmlText>
              <ButtonPrimary link={url} uiText="登录" />
              <MjmlText cssClass="paragraph">
                如果您使用的是移动设备，您还可以复制下面的链接并将其粘贴到您选择的浏览器中。
              </MjmlText>
              <MjmlText cssClass="paragraph">
                <a
                  rel="nofollow"
                  style={{
                    textDecoration: "none",
                    color: `${purple} !important`,
                  }}
                >
                  {url.replace(/^https?:\/\//, "")}
                </a>
              </MjmlText>
              <MjmlText cssClass="paragraph">
                如果您没有请求此电子邮件，您可以安全地忽略它。
              </MjmlText>
              <Divider />
            </MjmlColumn>
          </MjmlSection>
          <Footer footnote={false} />
        </MjmlWrapper>
      </MjmlBody>
    </Mjml>
  );
}
