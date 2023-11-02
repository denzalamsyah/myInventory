import { useState, useEffect, useRef } from "react";
import { CgMoreO } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import Button from "../../button/button";
import ReactToPrint from "react-to-print";
import UpdateRoom from "../../childtabel/room/updateRoom";
import DeleteRoom from "../../childtabel/room/deleteRoom";

export default function TabelDataRoom({ modal }) {
  const [roomData, setRoomData] = useState([]);
  const componentRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [screenSize, setScreenSize] = useState("md");
  const [pageSize, setPageSize] = useState(5);

  const screenSizes = {
    "2xl": 10,
    md: 5,
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRoom(currentPage, searchQuery); // Gunakan searchQuery
  };

  useEffect(() => {
    fetchRoom(currentPage, searchQuery);
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
  const fetchRoom = async (page, query = "") => {
    try {
      const url = query
        ? `http://localhost:9000/api/ruangan/search?nama=${query}`
        : `http://localhost:9000/api/ruangan?page=${page}&size=${pageSize}`;
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
            height: "45vh",
            width: "148vh",
            scrollSnapType: "x mandatory",
          }}
        >
          <div>
            <table className="table caption-top w-full">
              <thead className="w-auto bg-slate-200">
                <tr className="text-[12px] 2xl:text-lg">
                  <th className="border border-gray-300 py-1 text-gray-800 text-center">
                    ID Ruangan
                  </th>
                  <th className="border border-gray-300 py-1 text-gray-800 text-center">
                    Kode Ruangan
                  </th>
                  <th className="border border-gray-300 py-1 text-gray-800 text-center">
                    Nama Ruangan
                  </th>
                  <th className="border border-gray-300 py-1 text-gray-800 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-scroll">
                {roomData.data && roomData.data.length > 0 ? (
                  roomData.data.map((room, index) => (
                    <tr
                      key={index}
                      className="text-center border text-black border-gray-300"
                    >
                      <td className="border border-gray-300 py-1 text-[12px] 2xl:text-lg">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 py-1 px-1 text-[12px] 2xl:text-lg">
                        {room.kode}
                      </td>
                      <td className="border border-gray-300 py-1 px-1 text-[12px] 2xl:text-lg">
                        {room.nama}
                      </td>
                      <td className="flex space-x-2  py-4 justify-center">
                        {/* update */}
                        <UpdateRoom {...room} />
                        {/* delete */}
                        <DeleteRoom id={room.id} nama={room.nama} />
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
            disabled={currentPage === roomData.totalPages}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
