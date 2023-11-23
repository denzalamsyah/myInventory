import Button from "../button/button";
import { BiSearch } from "react-icons/bi";
import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
export default function LargeCard({ children, modal }) {
  const componentRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/karyawan/search?nama=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setEmployeeData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-md px-4 py-6 shadow-lg">
      <div className="px-[5px]">
        <div className="flex items-center justify-between mb-6">
          <div className="md:flex md:gap-2 md:space-y-0 space-y-2">
            {modal}
            <ReactToPrint
              trigger={() => (
                <Button
                  className="text-[12px] 2xl:text-lg px-4 rounded-[5px] p-1 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white"
                  href="#"
                  type="submit"
                >
                  Download All
                </Button>
              )}
              content={() => componentRef.current} // Gunakan componentRef.current
              documentTitle="Data"
              pageStyle="print"
            />
          </div>
          {/* <form
            className="hidden md:flex border bg-white rounded-[5px] shadow-md py-1 px-3 items-center"
            role="search"
          >
            <button className="mr-2">
              <BiSearch className="w-4 h-4 2xl:w-6 2xl:h-6 text-gray-400" />
            </button>
            <input
              className="text-[12px] 2xl:text-lg outline-none bg-white"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form> */}
          <form
            className="hidden md:flex border bg-white rounded-[5px] shadow-md py-1 px-3 items-center"
            role="search"
            onSubmit={handleSearch}
          >
            <button className="mr-2">
              <BiSearch className="w-4 h-4 2xl:w-6 2xl:h-6 text-gray-400" />
            </button>
            <input
              className="text-[12px] 2xl:text-lg outline-none bg-white"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        <div
          ref={componentRef}
          className="grid gap-3 snap-x overflow-auto scroll-smooth scrollbar-thin scrollbar-thumb-red scrollbar-track-gray-200 scrollbar-thumb-hover:#b30000"
          style={{
            height: "50vh",
            width: "148vh",
            scrollSnapType: "x mandatory",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
