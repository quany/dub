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
import { grayDark, purple } from "./components/theme";

export default function ProjectDeleted({
  domain,
  projectSlug,
}: {
  domain: string;
  projectSlug: string;
}): JSX.Element {
  return (
    <Mjml>
      <Head />
      <MjmlBody width={500}>
        <MjmlWrapper cssClass="container">
          <Header title="Project Deleted" />
          <MjmlSection cssClass="smooth">
            <MjmlColumn>
              <MjmlText cssClass="paragraph">嘿！</MjmlText>
              <MjmlText cssClass="paragraph">
                Just wanted to let you know that your domain{" "}
                <code>
                  <a
                    rel="nofollow"
                    style={{
                      textDecoration: "none",
                      color: `${purple} !important`,
                    }}
                  >
                    {domain}
                  </a>
                </code>{" "}
                for your Dub project{" "}
                <a href={`https://app.l0l.ink/${projectSlug}`} target="_blank">
                  {projectSlug}↗
                </a>{" "}
                has been invalid for 30 days. As a result, your project has been
                deleted from Dub.
              </MjmlText>
              <MjmlText cssClass="paragraph">
                如果您想恢复项目，您可以使用下面的链接在 l0l
                上轻松地重新创建它。
              </MjmlText>
              <ButtonPrimary
                link={`https://app.l0l.ink/`}
                uiText="Create a new project"
              />
              <MjmlText cssClass="paragraph">
                如果您不想将此项目保留在 Dub 上，您可以直接忽略此电子邮件。
              </MjmlText>
              <MjmlText cssClass="paragraph" color={grayDark}>
                来自l0l的Quany
              </MjmlText>
              <Divider />
            </MjmlColumn>
          </MjmlSection>
          <Footer />
        </MjmlWrapper>
      </MjmlBody>
    </Mjml>
  );
}
