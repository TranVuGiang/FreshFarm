import { Header } from "@/components/admin/components/Header";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import NavbarDefault from "@/components/layout/NavbarDefault";
import React from "react";

const FooterLayouts = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default FooterLayouts;
