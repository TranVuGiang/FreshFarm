import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import React from "react";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
