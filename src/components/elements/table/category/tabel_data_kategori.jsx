import { useState, useEffect, useRef } from "react";
import DeleteKategori from "../../childtabel/kategori/deleteKategori";
import UpdateKategori from "../../childtabel/kategori/updateKategori";
import { BiSearch } from "react-icons/bi";
import Button from "../../button/button";
import ReactToPrint from "react-to-print";

export default function TabelDataKategori({ modal }) {
  const [categoryData, setCategoryData] = useState([]);
  const componentRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [screenSize, setScreenSize] = useState("md");
  const [pageSize, setPageSize] = useState(5);
  const [downloadCategories, setDownloadCategories] = useState(null);
  const [searchParam, setSearchParam] = useState("nama");
  const screenSizes = {
    "2xl": 10,
    md: 5,
  };
  const handleSearch = (e) => {
    e.preventDefault();
    fetchCategory(currentPage, searchQuery, searchParam); // Gunakan searchQuery
  };

  useEffect(() => {
    fetchCategory(currentPage, searchQuery, searchParam);
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
  const fetchCategory = async (page, query = "", param) => {
    try {
      const url = query
        ? `http://localhost:9000/api/kategori/search?${param}=${query}`
        : `http://localhost:9000/api/kategori?page=${page}&size=${pageSize}`;
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
      setCategoryData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCategory(currentPage);
  }, [currentPage]);

  return (
    <div className="flex flex-col h-full bg-white rounded-md px-4 pt-6 shadow-lg">
      <div className="px-[5px]">
        <div className="flex items-center justify-between mb-6">
          <div className="md:flex md:gap-2 md:space-y-0 space-y-2">
            {modal}
            <Button
              className="text-[12px] 2xl:text-lg px-4 rounded-[5px] p-1 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white"
              href=""
              type="submit"
            >
              Download All
            </Button>
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
            <select
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
              className="px-[16px] py-1 w-full bg-white text-[12px] text-gray-700 focus:none outline-none"
            >
              <option value="nama">Nama</option>
              <option value="kode">Kode Kategori</option>
            </select>
          </form>
        </div>
        <div
          ref={componentRef}
          className="grid gap-3 snap-x overflow-auto scroll-smooth scrollbar-thin scrollbar-thumb-red scrollbar-track-gray-200 scrollbar-thumb-hover:#b30000"
          style={{
            height: "45vh",
            width: "100%",
            scrollSnapType: "x mandatory",
          }}
        >
          <div>
            <table className="table caption-top w-full">
              <thead className="bg-slate-200">
                <tr className="text-[12px] 2xl:text-lg py-3">
                  <th className="border border-gray-300  text-gray-800 text-center">
                    ID Kategori
                  </th>
                  <th className="border border-gray-300  text-gray-800 text-center">
                    Kode Kategori
                  </th>
                  <th className="border border-gray-300  text-gray-800 text-center">
                    Nama Kategori
                  </th>
                  <th className="border border-gray-300  text-gray-800 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-scroll">
                {categoryData.data && categoryData.data.length > 0 ? (
                  categoryData.data.map((category, index) => (
                    <tr
                      key={index}
                      className="text-center border text-[12px] 2xl:text-[16px] text-black border-gray-300"
                    >
                      <td className="border border-gray-300 py-1">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 py-1">
                        {category.kode}
                      </td>
                      <td className="border border-gray-300 py-1 px-1">
                        {category.nama}
                      </td>
                      <td className="flex space-x-2  py-4 justify-center">
                        {/* update */}
                        <UpdateKategori {...category} />
                        {/* delete */}
                        <DeleteKategori id={category.id} nama={category.nama} />
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
          <button className="join-item bg-transparent text-[12px] p-2">
            Page {currentPage + 1}
          </button>
          <button
            className="join-item bg-transparent hover:bg-blue-700 hover:text-white p-2"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === categoryData.totalPages}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
