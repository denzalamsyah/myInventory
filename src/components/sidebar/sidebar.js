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
  const router = useRouter();
  useEffect(() => {
    fetchProfile();
  }, []);
  async function fetchProfile() {
    const res = await fetch("http://localhost:9000/api/kategori", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  function logout() {
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <div className="flex">
      <div
        className={`bg-[#474747] h-screen fixed ${
          open ? "w-52 lg:w-72" : "w-16"
        } duration-300 text-white px-4 border-r-2 border-gray-500`}
      >
        <div className="py-5 2xl:py-10 flex justify-center gap-2 border-b border-white">
          <Link href="/dashboard">
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
                <Link
                  href={menu.link}
                  onClick={logout}
                  className={`group flex items-center text-sm 2xl:text-xl gap-3.5 font-medium p-2 bg-[#585858] shadow-lg hover:bg-white hover:text-black rounded-md`}
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
              ) : (
                <Link
                  href={menu.link}
                  className={` ${
                    menu.margin && "mt-5"
                  } group flex items-center text-sm 2xl:text-xl gap-3.5 font-medium p-2 bg-[#585858] shadow-lg hover:bg-white hover:text-black rounded-md`}
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
