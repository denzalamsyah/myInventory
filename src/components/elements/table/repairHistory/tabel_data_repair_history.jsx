import { useState, useEffect, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import UpdatePerbaikan from "../../childtabel/repair/updateRepair";
import DeletePerbaikan from "../../childtabel/repair/deleteRepair";
import DownloadCSVPerbaikan from "./downloadCSV";
import DownloadExcelPerbaikan from "./downloadExcel";
import DownloadPdfPerbaikan from "./downloadPdf";
export default function TabelDataRepairHistory({ modal }) {
  const [repairDataHistory, setRepairData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [screenSize, setScreenSize] = useState("md");
  const [pageSize, setPageSize] = useState(16);
  const componentRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParam, setSearchParam] = useState("nama");

  console.log(repairDataHistory);
  const screenSizes = {
    "2xl": 20,
    md: 10,
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRepair(currentPage, searchQuery, searchParam);
  };
  useEffect(() => {
    fetchRepair(currentPage, searchQuery, searchParam);
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
  const fetchRepair = async (page, query = "", param) => {
    try {
      const url = query
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/perbaikan/search?${param}=${query}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/perbaikan?page=${page}&size=${pageSize}`;
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
      setRepairData(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRepair(currentPage);
  }, [currentPage]);

  return (
    <div className="flex flex-col h-full bg-white rounded-md px-4 py-6 shadow-lg">
      <div className="grid lg:grid-cols-10 grid-cols-1 gap-6 mb-6">
        <div className="grid lg:col-span-5">
          <div className="mb-2">{modal} </div>
          <div className=" grid grid-col-1 md:grid-cols-3 gap-2">
            <DownloadPdfPerbaikan />
            {/* <DownloadCSVPerbaikan /> */}
            {/* <DownloadExcelPerbaikan /> */}
          </div>
        </div>
        <div className="col-span-1 lg:col-span-5 lg:col-start-8">
          <form
            className="grid col-span-1 md:grid-cols-3 border bg-white rounded-[5px] border-slate-300 py-1 px-3 items-center"
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
              className=" md:px-[16px] py-3 md:py-1 w-full bg-white text-[12px] 2xl:text-[16px] text-gray-700 focus:none outline-none"
            >
              <option value="kodeAsset">Kode</option>
              <option value="biaya">Biaya</option>
            </select>
          </form>
        </div>
      </div>

      <div
        ref={componentRef}
        className="grid gap-3 snap-x overflow-auto scroll-smooth scrollbar-thin scrollbar-thumb-red scrollbar-track-gray-200 scrollbar-thumb-hover:#b30000"
        style={{
          height: "65vh",
          width: "100%",
          scrollSnapType: "x mandatory",
        }}
      >
        <div>
          <table className="w-full">
            <thead className=" bg-slate-200">
              <tr className="2xl:text-[16px] py-3 border">
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  No
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Kode Aset
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Tanggal Perbaikan
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Biaya
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Tanggal Selesai Diperbaiki
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Yang Memperbaiki
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Tempat Perbaikan
                </th>
              </tr>
            </thead>
            <tbody className="">
              {repairDataHistory && repairDataHistory.length > 0 ? (
                repairDataHistory.map(
                  (repair, index) => (
                    console.log(repair),
                    (
                      <tr
                        key={index}
                        className="text-center border text-[12px] 2xl:text-[16px] text-black border-gray-300"
                      >
                        <td className="py-2 px-1">{index + 1}</td>
                        <td className="py-2 px-1">
                          {repair?.inventoryId?.kodeAsset || "-"}
                        </td>
                        <td className="py-2 px-1">
                          {repair?.tanggalPerbaikan || "-"}
                        </td>
                        <td className="py-2  px-1">
                          Rp. {repair?.biaya || "-"}
                        </td>
                        <td className="py-2  px-1">
                          {repair?.tanggalSelesaiPerbaikan || "-"}
                        </td>
                        <td className="py-2  px-1">{repair?.nama || "-"}</td>
                        <td className="py-2  px-1">{repair?.tempat || "-"}</td>
                        {/* <td className="py-2">
                          <div className="flex justify-center gap-2">
                            <div className="flex items-center justify-center">
                        
                              <UpdatePerbaikan
                                id={repair?.id}
                                inventoryId={repair?.inventoryId}
                                TanggalKerusakan={repair?.tanggalKerusakan}
                                Deskripsi={repair?.deskripsi}
                              />
                            </div>
                            <div className="flex items-center justify-center">
                         
                              <DeletePerbaikan
                                id={repair?.id}
                                nama={repair?.inventoryId.kodeAsset}
                              />
                            </div>
                          </div>
                        </td> */}
                      </tr>
                    )
                  )
                )
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
        <button className="join-item bg-transparent text-[12px] p-2">
          Page {currentPage + 1}
        </button>
        <button
          className="join-item bg-transparent hover:bg-blue-700 hover:text-white p-2"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === repairDataHistory.totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
}
