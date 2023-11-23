import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/elements/button/button";

export default function TabelDataInventoryDash({ modal }) {
  const [inventoryData, setInventoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [screenSize, setScreenSize] = useState("md");
  const [pageSize, setPageSize] = useState(10);
  const componentRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParam, setSearchParam] = useState("nama");
  // const [isLoading, setIsLoading] = useState(false);
  console.log(inventoryData);
  const screenSizes = {
    "2xl": 15,
    md: 10,
  };

  const handleSearch = (e) => {
    e.preventDefault();

    fetchInventory(currentPage, searchQuery, searchParam);
  };

  useEffect(() => {
    fetchInventory(currentPage, searchQuery, searchParam);
  }, [currentPage, searchQuery, searchParam]);

  useEffect(() => {
    const handleResize = () => {
      const newSize = window.matchMedia("(min-width: 1536px)").matches
        ? "2xl"
        : "md";
      setScreenSize(newSize);
      if (screenSizes[newSize]) {
        setPageSize(screenSizes[newSize]);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const fetchInventory = async (page, query = "", param) => {
    try {
      // setIsLoading(true);
      const url = query
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/inventory/search?${param}=${query}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/inventory?page=${page}&size=${pageSize}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setInventoryData(data);
      } else {
        console.log("data kosong");
      }

      // setIsLoading(false);
    } catch {
      console.error("error");
    }
  };
  useEffect(() => {
    fetchInventory(currentPage);
  }, [currentPage]);
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg px-4 pt-6 shadow-lg">
      <div
        ref={componentRef}
        className="grid gap-3 snap-x overflow-auto scroll-smooth scrollbar-thin scrollbar-thumb-red scrollbar-track-gray-200 scrollbar-thumb-hover:#b30000"
        style={{
          height: "100%",
          width: "100%",
          scrollSnapType: "x mandatory",
        }}
      >
        <div>
          <table className="w-full">
            <thead className=" bg-slate-200">
              <tr className="2xl:text-lg py-3 border border-gray-300">
                <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                  No
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                  Gambar
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                  Kode Asset
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                  Status
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                  Lainnya
                </th>
              </tr>
            </thead>
            <tbody className="">
              {inventoryData.data && inventoryData.data.length > 0 ? (
                inventoryData.data.map(
                  (inventory, index) => (
                    console.log(inventory),
                    (
                      <tr
                        key={index}
                        className="text-center border text-[12px] 2xl:text-[16px] text-black border-gray-300"
                      >
                        <td className="py-2">{index + 1}</td>
                        <td className=" py-2 px-2">
                          <div className="flex  justify-center items-center">
                            <Image
                              alt={inventory.nama}
                              src={inventory.gambar}
                              width={50}
                              height={50}
                              className="rounded-sm"
                            />
                          </div>
                        </td>
                        <td className="py-2">{inventory.kodeAsset}</td>
                        <td className="py-2 px-2">{inventory.status}</td>
                        <td className="py-2 px-2">
                          <Link href="/inventory" className="text-blue-500">
                            View More..
                          </Link>
                        </td>
                      </tr>
                    )
                  )
                )
              ) : (
                <tr className="text-center border text-[12px] 2xl:text-[16px] text-black border-gray-300">
                  <td colSpan="12" className="text-center">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="join bg-white">
        <button
          className="join-item bg-transparent hover:bg-blue-700 hover:text-white p-2"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          «
        </button>
        <button className="join-item bg-transparent text-[12px] p-2">
          Page {currentPage + 1}
        </button>
        <button
          className="join-item bg-transparent hover:bg-blue-700 hover:text-white p-2"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === inventoryData.totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
}
