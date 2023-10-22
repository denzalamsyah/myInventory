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
      name: "Category",
      icon: "/img/icon3.png",
      link: "/category",
    },
    {
      name: "Employee",
      icon: "/img/icon4.png",
      link: "/employee",
    },
  ];
  return (
    <div className="border-r-[3px] max-h-screen w-72 pt-[30px] border-gray-500 bg-[#474747]">
      <div className="flex justify-center mb-9 border-b-[2px] pb-[30px]">
        <Link href="/dashboard">
          <Image
            src="/img/logoWIT.png"
            alt="logo WIT"
            width={100}
            height={25}
          />
        </Link>
      </div>
      <div className="px-8 mb-[200px]">
        <ul className="">
          {menu.map((item, index) => (
            <li
              key={index}
              className="mb-4 text-white text-[14px] hover:bg-white hover:text-black py-2 px-2 hover:rounded-[5px] "
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
          <li className="mb-4 text-white text-[16px] hover:bg-white hover:text-black py-2 px-2 hover:rounded-[5px] ">
            <div className="flex">
              <Image
                src="/img/icon5.png"
                width={24}
                height={24}
                alt="report"
                className="mr-5 bg-white rounded-[5px]"
              />
              <select className="bg-transparent text-[14px] w-full max-w-xs">
                <option disabled selected className="text-[12px]">
                  Report History
                </option>
                <option href="#" className="text-[12px]">
                  Usage History
                </option>
                <option className="text-[12px]">Repair History</option>
              </select>
            </div>
          </li>
        </ul>
      </div>
      <div className="px-8 text-white text-[14px">
        <ul>
          <li className="mb-4 text-white text-[14px] hover:bg-white hover:text-black py-2 px-2 hover:rounded-[5px] ">
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
