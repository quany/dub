import { MjmlColumn, MjmlSection, MjmlText } from "mjml-react";

export default function Footer({
  unsubscribe,
  footnote = true,
}: {
  unsubscribe?: boolean;
  footnote?: boolean;
}): JSX.Element {
  return (
    <MjmlSection cssClass="smooth">
      <MjmlColumn>
        <MjmlText cssClass="footer">
          © {new Date().getFullYear()} l0l.sh
          {unsubscribe && (
            <>
              &nbsp;&nbsp;·&nbsp;&nbsp;
              <a href="{{{ pm:unsubscribe }}}" target="_blank">
                退订
              </a>
            </>
          )}
        </MjmlText>
        {footnote && (
          <MjmlText cssClass="footer">
            如果你对这封邮件有任何反馈或疑问，只需回复即可。我很乐意收到你的来信！
          </MjmlText>
        )}
      </MjmlColumn>
    </MjmlSection>
  );
}
