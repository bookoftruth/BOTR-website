import Navbar from "./Navbar";
import Footer from "./Footer";
import Background from "./Background";

const Layout = ({ children, theme, openWindow, showWindow }) => {
  return (
    <div className="select-none">
      <Navbar theme={theme} openWindow={openWindow} showWindow={showWindow} />
      <Background theme={theme} />
      <Footer theme={theme}/>
      {children}
    </div>
  );
}

export default Layout;