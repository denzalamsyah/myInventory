import React, { Children, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Logout from "./logout";

const Sidebar = ({ children }) => {
  const menus = [
    { name: "Dashboard", link: "/dashboard", icon: "/img/icon1.png" },
    { name: "Inventory", link: "/inventory", icon: "/img/icon2.png" },
    { name: "Room", link: "/room", icon: "/img/icon6.png" },
    { name: "Category", link: "/category", icon: "/img/icon3.png" },
    {
      name: "Employee",
      link: "/employee",
      icon: "/img/icon4.png",
      text: "Report History",
    },
    {
      name: "Usage History",
      link: "/usagehistory",
      icon: "/img/icon5.png",
      margin: true,
    },
    { name: "Repair History", link: "/repairhistory", icon: "/img/icon8.png" },

    { name: "Logout", link: "/", icon: "/img/logout.png" },
  ];
  const [open, setOpen] = useState(true);
  const [activePage, setActivePage] = useState("");
  const router = useRouter();
  useEffect(() => {
    const cureentPath = router.pathname;
    setActivePage(cureentPath);
  }, [router.pathname]);
  useEffect(() => {
    fetchProfile();
  }, []);
  async function fetchProfile() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/kategori`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  return (
    <div className="flex">
      <div
        className={`bg-[#474747] h-screen fixed ${
          open ? "w-52 lg:w-72" : "w-16"
        } duration-300 text-white px-4 border-r-2 border-gray-500`}
      >
        <div
          className={`${
            open
              ? "grid grid-cols-4 items-center gap-8"
              : "grid grid-cols-1 items-center"
          } py-5 2xl:py-10  justify-center border-b border-white`}
        >
          <Link href="/dashboard" className="col-span-3 flex justify-end">
            <Image
              src="/img/logoWIT.png"
              alt="logo WIT"
              width={100}
              height={25}
              className={`shadow-xl ${!open && "hidden"}`}
            />
          </Link>
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className={`${open && "px-4"} mt-8  flex flex-col gap-4 relative`}>
          {menus?.map((menu, i) => (
            <div key={i}>
              {menu.name === "Logout" ? (
                <Logout
                  h2={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                  h22={`${
                    open && "hidden"
                  } absolute left-48 bg-[#474747] font-semibold whitespace-pre text-white rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  name={menu.name}
                  link={menu.link}
                  icon={menu.icon}
                />
              ) : (
                <Link
                  href={menu.link}
                  className={` ${
                    menu.margin && "mt-5"
                  } group flex items-center text-sm 2xl:text-[16px] gap-3.5 font-medium p-2  ${
                    activePage === menu.link
                      ? "bg-white text-black"
                      : "bg-[#585858] text-white hover:bg-white hover:text-black"
                  } bg-[#585858] shadow-lg hover:bg-white hover:text-black rounded-md`}
                >
                  <Image
                    src={menu.icon}
                    alt={menu.name}
                    width={25}
                    height={25}
                  />
                  <h2
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {menu.name}
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-[#474747] font-semibold whitespace-pre text-white rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    {menu.name}
                  </h2>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      <main
        className={`w-full duration-300 ${
          open ? "ml-16 md:ml-52 lg:ml-72" : "ml-16"
        } scrollbar-hide`}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
