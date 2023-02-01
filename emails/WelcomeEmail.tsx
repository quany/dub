import {
  Mjml,
  MjmlBody,
  MjmlColumn,
  MjmlImage,
  MjmlSection,
  MjmlText,
  MjmlWrapper,
} from "mjml-react";
import Divider from "./components/Divider";
import Footer from "./components/Footer";
import Head from "./components/Head";
import Header from "./components/Header";
// import { grayDark } from "./components/theme";

export default function WelcomeEmail({ name }: { name?: string }): JSX.Element {
  return (
    <Mjml>
      <Head />
      <MjmlBody width={500}>
        <MjmlWrapper cssClass="container">
          <Header title="欢迎来到l0l.ink" />
          <MjmlSection padding="0">
            <MjmlColumn>
              <MjmlImage
                cssClass="hero"
                padding="0"
                align="left"
                src="https://l0l.ink/_static/thumbnail.png"
              />
            </MjmlColumn>
          </MjmlSection>
          <MjmlSection cssClass="smooth">
            <MjmlColumn>
              <MjmlText cssClass="paragraph">
                感谢您注册{name && `, ${name}`}!
              </MjmlText>
              <MjmlText cssClass="paragraph">
                我叫Quany，我是 l0l.ink 的创建者 - 开源有点另类。 我很高兴你能加入！
              </MjmlText>
              <MjmlText cssClass="paragraph">
              您可以做以下几件事：
              </MjmlText>
              <MjmlText cssClass="li">
                •&nbsp;&nbsp;创建一个自定义{" "}
                <a href="https://app.l0l.ink/links" target="_blank">
                l0l 短链接
                </a>
              </MjmlText>
              <MjmlText cssClass="li">
                •&nbsp;&nbsp;创建一个{" "}
                <a href="https://app.l0l.ink/" target="_blank">
                新项目
                </a>{" "}
                添加自己的短域名
              </MjmlText>
              {/* <MjmlText cssClass="li">
                •&nbsp;&nbsp;Star the repo on{" "}
                <a href="https://github.com/steven-tey/dub" target="_blank">
                  GitHub
                </a>
              </MjmlText>
              <MjmlText cssClass="li">
                •&nbsp;&nbsp;Follow us on{" "}
                <a href="https://twitter.com/dubdotsh/" target="_blank">
                  Twitter
                </a>
              </MjmlText>
              <MjmlText cssClass="paragraph">
                Let me know if you have any questions or feedback. I'm always
                happy to help!
              </MjmlText>
              <MjmlText cssClass="paragraph" color={grayDark}>
                Steven from Dub
              </MjmlText> */}
              <Divider />
            </MjmlColumn>
          </MjmlSection>
          <Footer unsubscribe />
        </MjmlWrapper>
      </MjmlBody>
    </Mjml>
  );
}
