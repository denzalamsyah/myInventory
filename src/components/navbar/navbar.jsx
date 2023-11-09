import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import { IoNotifications } from "react-icons/io5";
export default function Navbar() {
  return (
    <nav className="flex gap-4 justify-end border-b-[2px] w-auto items-center">
      <button>
        <IoNotifications
          className="text-gray-500 "
          style={{ width: 24, height: 24 }}
        />
      </button>
      <div className="flex ">
        <form
          className="flex border bg-white rounded-[5px] shadow-md py-1 px-3 items-center"
          role="search"
        >
          <input
            className="text-sm outline-none bg-white mr-2"
            type="search"
            placeholder="Search here"
            aria-label="Search"
          />
          <button className="">
            <BiSearch className="w-5 h-5 text-gray-400" />
          </button>
        </form>
      </div>
      <Image
        src="/img/user.png"
        className="rounded-full bg-slate-300 p-2"
        alt="User"
        width={40}
        height={40}
      ></Image>
    </nav>
  );
}
