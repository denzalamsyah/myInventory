import React, { Children, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "../elements/button/button";

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
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
  const handleLogoutClick = () => {
    setShowModal(true);
  };

  function logout() {
    localStorage.removeItem("token");
    router.push("/");
    setShowModal(false);
  }
  const handleChange = () => {
    setShowModal(false);
  };

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
                  onClick={handleLogoutClick}
                  className={`group flex items-center text-sm 2xl:text-[16px] gap-3.5 font-medium p-2 bg-[#585858] shadow-lg hover:bg-white hover:text-black rounded-md`}
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
                  } group flex items-center text-sm 2xl:text-[16px] gap-3.5 font-medium p-2 bg-[#585858] shadow-lg hover:bg-white hover:text-black rounded-md`}
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
      {showModal && (
        <div className="modal">
          <div className="modal-box bg-white flex flex-col justify-center items-center">
            <Image alt="del icon" src="/img/del.png" width={75} height={75} />
            <h1 className="font-bold text-lg text-black mb-3 mt-3">
              Are you sure to Logout?
            </h1>
            <div className="modal-action flex mt-4">
              <Button
                className="bg-red-400 rounded-[5px] mx-2 text-white text-sm px-4 py-1 hover:bg-red-600 "
                type="button"
                onClick={logout}
              >
                Yes
              </Button>
              <Button
                className="text-black rounded-[5px] text-sm shadow-lg mx-2 px-4 py-1 border border-gray-200 hover:bg-gray-500 hover:text-white"
                onClick={handleChange}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
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
