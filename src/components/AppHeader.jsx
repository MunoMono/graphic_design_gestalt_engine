import { Moon, Sun } from "@carbon/icons-react";
import { Header, HeaderGlobalAction, HeaderGlobalBar, HeaderName, Tag } from "@carbon/react";
import { PRODUCT_CONTEXT, PRODUCT_NAME } from "../engine/constants";

export default function AppHeader({ theme, onToggleTheme }) {
  const isDarkTheme = theme === "g100";

  return (
    <Header aria-label={PRODUCT_NAME} className="app-header-shell">
      <div className="app-header-shell__identity">
        <HeaderName href="#" className="app-header-shell__name">
          <span className="app-header-shell__name-roman">Graham Newman RCA PhD</span>{" "}
          <span className="app-header-shell__name-bold">graphic design gestalt engine</span>
        </HeaderName>
        <Tag type="cool-gray">{PRODUCT_CONTEXT}</Tag>
      </div>
      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}
          onClick={onToggleTheme}
          tooltipAlignment="end"
        >
          {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
        </HeaderGlobalAction>
        <Tag type="cool-gray">Prototype</Tag>
      </HeaderGlobalBar>
    </Header>
  );
}