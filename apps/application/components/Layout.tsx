import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  return (
    <>
      <Navbar />
      <Header />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
