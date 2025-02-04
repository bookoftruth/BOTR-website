import Footer from "./Footer/Footer";
import Background from "./Background";
import TopBar from "./TopBar/TopBar";

const Layout = ({ children, theme, activateWindow }) => {
  return (
    <div className="select-none">
      <TopBar theme={theme} activateWindow={activateWindow} />
      <Background theme={theme} />
      <Footer theme={theme} />
      {children}
    </div>
  );
}

export default Layout;