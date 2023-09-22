import React from "react";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
};

const ZengoLayout = (props: Props) => {
  return (
    <>
      <Navbar />
      {props.children}
    </>
  );
};

export default ZengoLayout;
