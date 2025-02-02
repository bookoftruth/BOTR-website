import Navbar from "./Navbar";
import Footer from "./Footer";
import Background from "./Background";

const Layout = ({ children, theme, activateWindow }) => {
  return (
    <div className="select-none">
      <Navbar theme={theme} activateWindow={activateWindow} />
      <Background theme={theme} />
      <Footer theme={theme} />
      {children}
    </div>
  );
}

export default Layout;