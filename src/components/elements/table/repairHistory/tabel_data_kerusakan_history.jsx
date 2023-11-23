import { useState, useEffect, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import UpdatePerbaikan from "../../childtabel/repair/updateRepair";
import DeletePerbaikan from "../../childtabel/repair/deleteRepair";
import DownloadCSVPerbaikan from "./downloadCSV";
import DownloadExcelPerbaikan from "./downloadExcel";
import DownloadPdfPerbaikan from "./downloadPdf";
import UpdateKerusakan from "../../childtabel/repair/updateKerusakan";
import DownloadPdfKerusakan from "./downloadPdfKerusakan";
export default function TabelDataKerusakanHistory({ modal }) {
  const [kerusakanDataHistory, setKerusakanData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [screenSize, setScreenSize] = useState("md");
  const [pageSize, setPageSize] = useState(16);
  const componentRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParam, setSearchParam] = useState("deskripsi");

  console.log(kerusakanDataHistory);
  const screenSizes = {
    "2xl": 20,
    md: 10,
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchKerusakan(currentPage, searchQuery, searchParam);
  };
  useEffect(() => {
    fetchKerusakan(currentPage, searchQuery, searchParam);
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
  const fetchKerusakan = async (page, query = "", param) => {
    try {
      const url = query
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/kerusakan/search?${param}=${query}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/kerusakan?page=${page}&size=${pageSize}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        const data = await response.json();
        setKerusakanData(data.data);
      } else {
        console.log("data kosong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchKerusakan(currentPage);
  }, [currentPage]);

  return (
    <div className="flex flex-col h-full bg-white rounded-md px-4 py-6 shadow-lg">
      <div className="grid lg:grid-cols-10 grid-cols-1 gap-6 mb-6">
        <div className="grid lg:col-span-5">
          <div className="mb-2">{modal} </div>
          <div className=" grid grid-col-1 md:grid-cols-3 gap-2">
            <DownloadPdfKerusakan />
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
              <option value="deskripsi">Deskripsi</option>
              {/* <option value="tanggalRusak">Tanggal</option> */}
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
              <tr className="2xl:text-[16px] py-3 border border-gray-300">
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  No
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Kode Aset
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Tanggal Kerusakan
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Deskripsi
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Posisi Terakhir
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="">
              {kerusakanDataHistory && kerusakanDataHistory.length > 0 ? (
                kerusakanDataHistory.map(
                  (kerusakan, index) => (
                    console.log(kerusakan),
                    (
                      <tr
                        key={index}
                        className="text-center border text-[12px] 2xl:text-[16px] text-black border-gray-300"
                      >
                        <td className="py-2 px-2">{index + 1}</td>
                        <td className="py-2 px-2">
                          {kerusakan?.inventoryId?.kodeAsset}
                        </td>
                        <td className="py-2  px-2">
                          {kerusakan?.tanggalKerusakan}
                        </td>
                        <td className="py-2  px-2">{kerusakan?.deskripsi}</td>
                        <td className="py-2  px-2">
                          {kerusakan?.posisiTerakhir}
                        </td>
                        <td className="py-2 px-2">
                          <div className="flex justify-center gap-2">
                            <div className="flex items-center justify-center">
                              <UpdateKerusakan
                                id={kerusakan?.id}
                                inventoryId={kerusakan?.inventoryId}
                                TanggalKerusakan={kerusakan?.tanggalKerusakan}
                                Deskripsi={kerusakan?.deskripsi}
                                TanggalPerbaikan={kerusakan?.tanggalPerbaikan}
                              />
                            </div>
                            <div className="flex items-center justify-center">
                              <UpdatePerbaikan
                                id={kerusakan?.id}
                                inventoryId={kerusakan?.inventoryId}
                                TanggalKerusakan={kerusakan?.tanggalKerusakan}
                                Deskripsi={kerusakan?.deskripsi}
                                TanggalPerbaikan={kerusakan?.tanggalPerbaikan}
                                Biaya={kerusakan?.biaya}
                                TanggalSelesaiPerbaikan={
                                  kerusakan?.tanggalSelesaiPerbaikan
                                }
                              />
                            </div>
                            <div className="flex items-center justify-center">
                              {/* delete */}
                              <DeletePerbaikan
                                id={kerusakan?.id}
                                nama={kerusakan?.inventoryId.kodeAsset}
                              />
                            </div>
                          </div>
                        </td>
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
          disabled={currentPage === kerusakanDataHistory.totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
}
