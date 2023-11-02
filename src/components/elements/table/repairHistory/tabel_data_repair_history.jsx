import { useState, useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
import Button from "../../button/button";
import { BiSearch } from "react-icons/bi";
import UpdatePerbaikan from "../../childtabel/repair/updateRepair";
import DeletePerbaikan from "../../childtabel/repair/deleteRepair";
export default function TabelDataRepairHistory({ modal }) {
  const [repairDataHistory, setRepairData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [screenSize, setScreenSize] = useState("md");
  const [pageSize, setPageSize] = useState(4);
  const componentRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  const screenSizes = {
    "2xl": 6,
    md: 4,
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRepair(currentPage, searchQuery);
  };
  useEffect(() => {
    fetchRepair(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

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
  const fetchRepair = async (page, query = "") => {
    try {
      const url = query
        ? `http://localhost:9000/api/perbaikan/search?nama=${query}`
        : `http://localhost:9000/api/perbaikan?page=${page}&size=${pageSize}`;
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
      setRepairData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRepair(currentPage);
  }, [currentPage]);

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
              content={() => componentRef.current}
              documentTitle="Data"
              pageStyle="print"
            />
          </div>
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
            height: "65vh",
            width: "148vh",
            scrollSnapType: "x mandatory",
          }}
        >
          <div>
            <table className="table caption-top w-full">
              <thead className=" bg-slate-200">
                <tr className="2xl:text-lg py-3">
                  <th className="border border-gray-300 py-1 text-gray-800 text-center">
                    ID
                  </th>
                  <th className="border border-gray-300 py-1 text-gray-800 text-center">
                    Kode Aset
                  </th>
                  <th className="border border-gray-300 py-1 text-gray-800 text-center">
                    Tanggal Kerusakan
                  </th>
                  <th className="border border-gray-300 py-1 text-gray-800 text-center">
                    Tanggal Perbaikan
                  </th>
                  <th className="border border-gray-300 py-1 text-gray-800 text-center">
                    Biaya
                  </th>
                  <th className="border border-gray-300 py-1 text-gray-800 text-center">
                    Tanggal Selesai Diperbaiki
                  </th>
                  <th className="border border-gray-300 py-1 text-gray-800 text-center">
                    Deskripsi
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {repairDataHistory.data && repairDataHistory.data.length > 0 ? (
                  repairDataHistory.data.map((repair, index) => (
                    <tr
                      key={index}
                      className="text-center border text-[12px] text-black border-gray-300"
                    >
                      <td className="border border-gray-300 py-1">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 py-1 px-1">
                        {repair.tanggalKerusakan}
                      </td>
                      <td className="border border-gray-300 py-1 px-1">
                        {repair.tanggalPerbaikan}
                      </td>
                      <td className="border border-gray-300 py-1 px-1">
                        {repair.biaya}
                      </td>
                      <td className="border border-gray-300 py-1 px-1">
                        {repair.tanggalSelesaiPerbaikan}
                      </td>
                      <td className="border border-gray-300 py-1 px-1">
                        {repair.deskripsi}
                      </td>
                      <td className="border border-gray-300">
                        <div className="flex justify-center gap-2">
                          <div className="flex items-center justify-center">
                            {/* update */}
                            <UpdatePerbaikan {...repair} />
                          </div>
                          <div className="flex items-center justify-center">
                            {/* delete */}
                            <DeletePerbaikan
                              id={repair.id}
                              nama={repair.inventoryId}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
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
    </div>
  );
}
