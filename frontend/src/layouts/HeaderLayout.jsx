import Footer from "@/components/layout/Footer";
import NavbarDefault from "@/components/layout/NavbarDefault";

const HeaderLayout = ({ children }) => {
  return (
    <div>
      <NavbarDefault />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default HeaderLayout;
