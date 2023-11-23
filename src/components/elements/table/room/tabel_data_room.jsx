import { useState, useEffect, useRef } from "react";
import { CgMoreO } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import Button from "../../button/button";
import ReactToPrint from "react-to-print";
import UpdateRoom from "../../childtabel/room/updateRoom";
import DeleteRoom from "../../childtabel/room/deleteRoom";
import DownloadPdfRuangan from "./downloadPdf";
import DownloadCSVRuangan from "./downloadCSV";
import DownloadExcelRuangan from "./downloadExcel";
import Image from "next/image";
import DetailRoom from "../../childtabel/room/detailRoom";

export default function TabelDataRoom({ modal }) {
  const [roomData, setRoomData] = useState([]);
  const componentRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [screenSize, setScreenSize] = useState("md");
  const [pageSize, setPageSize] = useState(10);
  const [searchParam, setSearchParam] = useState("nama");
  console.log(roomData);
  const screenSizes = {
    "2xl": 15,
    md: 10,
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRoom(currentPage, searchQuery, searchParam); // Gunakan searchQuery
  };

  useEffect(() => {
    fetchRoom(currentPage, searchQuery, searchParam);
  }, [currentPage, searchQuery, searchParam]);

  useEffect(() => {
    const handleResize = () => {
      const newSize = window.matchMedia("(min-width: 1536px)").matches
        ? "2xl"
        : "md";

      setScreenSize(newSize);

      // Setel ukuran yang sesuai
      if (screenSizes[newSize]) {
        setPageSize(screenSizes[newSize]);
      }
    };

    // Panggil handleResize saat komponen dimuat
    handleResize();

    // Tambahkan event listener untuk memantau perubahan ukuran layar
    window.addEventListener("resize", handleResize);

    // Hapus event listener saat komponen dibongkar
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const fetchRoom = async (page, query = "", param) => {
    try {
      const url = query
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/ruangan/search?${param}=${query}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/ruangan?page=${page}&size=${pageSize}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      console.log(response);

      const data = await response.json();
      setRoomData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRoom(currentPage);
  }, [currentPage]);

  return (
    <div className="flex flex-col h-full bg-white rounded-md px-4 pt-6 shadow-lg">
      <div className="grid lg:grid-cols-10 grid-cols-1 gap-6 mb-6">
        <div className="grid lg:col-span-5">
          <div className="mb-2">{modal} </div>
          <div className=" grid grid-col-1 md:grid-cols-3 gap-2">
            {/* <DownloadPdfRuangan />
            <DownloadCSVRuangan /> */}
            {/* <DownloadExcelRuangan /> */}
          </div>
        </div>
        <div className="col-span-1 lg:col-span-5 lg:col-start-8">
          <form
            className="grid col-span-1 md:grid-cols-3 bg-white rounded-[5px] border border-slate-300 py-1 px-3 items-center"
            role="search"
            onSubmit={handleSearch}
          >
            <div className="col-span-1 md:col-span-2 flex items-center">
              <button className="mr-2">
                <BiSearch className="w-4 h-4 2xl:w-6 2xl:h-6 text-gray-400" />
              </button>
              <input
                className="text-[12px] 2xl:text-[16px] outline-none bg-white"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
              className="md:px-[16px] py-3 md:py-1 w-full bg-white text-[12px] 2xl:text-[16px] text-gray-700 focus:none outline-none"
            >
              <option value="nama">Nama</option>
              <option value="kode">Kode Ruangan</option>
            </select>
          </form>
        </div>
      </div>

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
            <thead className=" bg-slate-200 border border-gray-300">
              <tr className="text-[12px] 2xl:text-[16px] py-3">
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  No Ruangan
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Gambar
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Kode Ruangan
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Nama Ruangan
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Nama Lantai
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Lokasi Ruangan
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="">
              {roomData.data && roomData.data.length > 0 ? (
                roomData.data.map((room, index) => (
                  <tr
                    key={index}
                    className="text-center border  text-[12px] 2xl:text-[16px] text-black border-gray-300"
                  >
                    <td className="py-2 px-2">{index + 1}</td>
                    <td className=" py-2 px-2">
                      <div className="flex  justify-center items-center">
                        <Image
                          alt={room?.kode}
                          src={room?.gambar}
                          width={50}
                          height={50}
                          className="rounded-sm"
                        />
                      </div>
                    </td>
                    <td className="py-2 px-2">{room?.kode}</td>
                    <td className="py-2 px-2">{room?.nama}</td>
                    <td className="py-2 px-2">{room?.lantai}</td>
                    <td className="py-2 px-2">{room?.lokasi}</td>
                    <td className="py-2 px-2">
                      <div className="flex justify-center gap-2">
                        <div className="flex items-center justify-center">
                          <DetailRoom {...room} />
                        </div>
                        <div className="flex items-center justify-center">
                          <UpdateRoom {...room} />
                        </div>
                        <div className="flex items-center justify-center">
                          <DeleteRoom id={room?.id} nama={room?.nama} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
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
        <button className="join-item bg-transparent text-[12px] 2xl:text-[14px] p-2">
          Page {currentPage + 1}
        </button>
        <button
          className="join-item bg-transparent hover:bg-blue-700 hover:text-white p-2"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === roomData.totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
}
