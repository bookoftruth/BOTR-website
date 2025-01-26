import Navbar from "./Navbar";
import Footer from "./Footer";
import Background from "./Background";

const Layout = ({ children, theme }) => {
  return (
    <div className="select-none">
      <Navbar theme={theme} />
      <Footer theme={theme}/>
      <Background theme={theme} />
      <main className="relative">{children}</main>
    </div>
  );
}

export default Layout;