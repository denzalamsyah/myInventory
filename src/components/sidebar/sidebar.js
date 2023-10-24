import Link from "next/link";
import Image from "next/image";
export default function Sidebar() {
  const menu = [
    {
      name: "Dashboard",
      icon: "/img/icon1.png",
      link: "/dashboard",
    },
    {
      name: "Inventory",
      icon: "/img/icon2.png",
      link: "/inventory",
    },
    {
      name: "Room",
      icon: "/img/icon6.png",
      link: "/room",
    },
    {
      name: "Usage",
      icon: "/img/icon7.png",
      link: "/usage",
    },
    {
      name: "Category",
      icon: "/img/icon3.png",
      link: "/category",
    },
    {
      name: "Employee",
      icon: "/img/icon4.png",
      link: "/employee",
    },
    {
      name: "Report History",
      icon: "/img/icon5.png",
      link: "/report",
    },
  ];
  return (
    <div className="border-r-[4px] h-screen w-[20%] pt-[30px] border-gray-500 bg-[#474747]">
      <div className="flex justify-center mb-9 border-b-[3px] pb-[30px]">
        <Link href="/dashboard">
          <Image
            src="/img/logoWIT.png"
            alt="logo WIT"
            width={100}
            height={25}
            className="shadow-xl"
          />
        </Link>
      </div>
      <div className="px-8 mb-[200px]">
        <ul className="">
          {menu.map((item, index) => (
            <li
              key={index}
              className="mb-4 rounded-[5px] bg-[#585858] text-white text-[14px] hover:bg-white hover:text-black py-2 px-2 hover:rounded-[5px] shadow-xl"
            >
              <Link href={item.link} className="flex">
                <Image
                  src={item.icon}
                  width={22}
                  height={22}
                  alt={item.name}
                  className="mr-6 bg-white rounded-[5px]"
                />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-8 text-white text-[14px] fixed bottom-0">
        <ul>
          <li className="mb-4 text-white text-[14px] py-2 px-2 hover:rounded-[5px] ">
            <Link href="/" className="flex">
              <Image
                src="/img/logout.png"
                width={22}
                height={22}
                alt="logout"
                className="mr-6 bg-white rounded-[5px]"
              />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
