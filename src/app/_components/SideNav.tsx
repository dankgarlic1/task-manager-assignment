"use client";
import React, { useEffect, useState } from "react";
import { GraduationCap, LayoutIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Loading from "./Loader";

export const SideNav = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const menuList = [
    {
      id: 1,
      name: "Tasks",
      icon: LayoutIcon,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Kabana",
      icon: GraduationCap,
      path: "/kabana",
    },
  ];

  // Use effect to stop the loading animation when the path changes
  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  const handleLinkClick = () => {
    setLoading(true);
  };

  return (
    <div className="border shadow-md h-screen p-5">
      <span className="text-2xl  font-extrabold text-center">Navigation</span>
      <hr className="my-5" />

      {loading ? (
        <Loading /> // Show loading component while the new route is loading
      ) : (
        menuList.map((menu) => (
          <Link href={menu.path} key={menu.id} onClick={handleLinkClick}>
            <h2
              className={`flex items-center gap-3 p-4 mb-3 text-md text-slate-500 hover:bg-violet-600 hover:text-white cursor-pointer rounded-lg ${
                pathname === menu.path && "bg-violet-700 text-white"
              }`}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))
      )}
    </div>
  );
};
