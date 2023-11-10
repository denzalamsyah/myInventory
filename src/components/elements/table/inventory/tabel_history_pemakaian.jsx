import { useState, useEffect } from "react";
import ReactToPrint from "react-to-print";
import Button from "../../button/button";
import { BiSearch } from "react-icons/bi";
import { useRef } from "react";
export default function TabelDataUsageHistoryById(inventoryData) {
  console.log(inventoryData);
  //   const [usageDataHistory, setUsageData] = useState([]);
  //   const [currentPage, setCurrentPage] = useState(0);
  //   const [screenSize, setScreenSize] = useState("md");
  //   const [pageSize, setPageSize] = useState(10);
  //   const componentRef = useRef(null);
  //   const [searchQuery, setSearchQuery] = useState("");
  //   const screenSizes = {
  //     "2xl": 20,
  //     md: 10,
  //   };

  //   const handleSearch = (e) => {
  //     e.preventDefault();
  //     fetchUsage(currentPage, searchQuery);
  //   };
  //   useEffect(() => {
  //     fetchUsage(currentPage, searchQuery);
  //   }, [currentPage, searchQuery]);

  //   useEffect(() => {
  //     const handleResize = () => {
  //       const newSize = window.matchMedia("(min-width: 1536px)").matches
  //         ? "2xl"
  //         : "md";

  //       setScreenSize(newSize);

  //       // Setel ukuran yang sesuai
  //       if (screenSizes[newSize]) {
  //         setPageSize(screenSizes[newSize]);
  //       }
  //     };

  //     // Panggil handleResize saat komponen dimuat
  //     handleResize();

  //     // Tambahkan event listener untuk memantau perubahan ukuran layar
  //     window.addEventListener("resize", handleResize);

  //     // Hapus event listener saat komponen dibongkar
  //     return () => {
  //       window.removeEventListener("resize", handleResize);
  //     };
  //   }, []);
  //   const fetchUsage = async (page, query = "") => {
  //     try {
  //       const url = query
  //         ? `http://localhost:9000/api/pemakaian/search?nama=${query}`
  //         : `http://localhost:9000/api/pemakaian?page=${page}&size=${pageSize}`;
  //       const response = await fetch(url, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + localStorage.getItem("token"),
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }

  //       console.log(response);

  //       const data = await response.json();
  //       setUsageData(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchUsage(currentPage);
  //   }, [currentPage]);
  return (
    <div className="flex flex-col h-full bg-white rounded-md px-4 py-6 shadow-lg">
      <div className="px-[5px]">
        <div className="flex items-center justify-between mb-6">
          <div className="md:flex md:gap-2 md:space-y-0 space-y-2">
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
              documentTitle="Data"
              pageStyle="print"
            />
          </div>
          {/* <form
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
          </form> */}
        </div>
        <div
          className="grid gap-3 snap-x overflow-auto scroll-smooth scrollbar-thin scrollbar-thumb-red scrollbar-track-gray-200 scrollbar-thumb-hover:#b30000"
          style={{
            height: "65vh",
            width: "100%",
            scrollSnapType: "x mandatory",
          }}
        >
          <div>
            <table className="w-full">
              <thead className="bg-slate-200">
                <tr className="2xl:text-lg py-3 border">
                  <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                    No
                  </th>
                  <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                    Nama/Nomor Induk Lama
                  </th>
                  <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                    Nama/Nomor Induk Baru
                  </th>
                  <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                    Tanggal
                  </th>
                  <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                    Ruangan Lama
                  </th>
                  <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                    Ruangan Baru
                  </th>
                  <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                    kode Aset
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="text-center border text-[12px] 2xl:text-[16px] text-black border-gray-300">
                  <td className="py-2"></td>
                  <td className="py-2 px-1">
                    {inventoryData.karyawanNamaOld} -{" "}
                    {inventoryData.nomorIndukOld}
                  </td>
                  <td className="py-2 px-1">
                    {inventoryData.karyawanNamaNew} -{" "}
                    {inventoryData.nomorIndukNew}
                  </td>
                  <td className="py-2 px-1">
                    {inventoryData.tanggalPemakaian}
                  </td>
                  <td className="py-2 px-1">{inventoryData.ruanganOld}</td>
                  <td className="py-2 px-1">{inventoryData.ruanganNew}</td>
                  <td className="py-2 px-1">{inventoryData.inventoryId}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* <div className="join bg-white">
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
            disabled={currentPage === usageDataHistory.totalPages}
          >
            »
          </button>
        </div> */}
      </div>
    </div>
  );
}
