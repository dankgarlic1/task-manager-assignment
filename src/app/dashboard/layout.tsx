import React, { Suspense } from "react";
import { SideNav } from "../_components/SideNav";
import Loading from "../_components/Loader";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <div className="md:w-64 fixed hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
};

export default Layout;
