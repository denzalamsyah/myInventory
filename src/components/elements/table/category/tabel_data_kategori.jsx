import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import DeleteKategori from "../../childtabel/kategori/deleteKategori";
import UpdateKategori from "../../childtabel/kategori/updateKategori";
import { BiSearch } from "react-icons/bi";
import Button from "../../button/button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function TabelDataKategori({ modal }) {
  const [categoryData, setCategoryData] = useState([]);
  const componentRef = useRef(null);
  const [reportPdf, setReportPdf] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [screenSize, setScreenSize] = useState("md");
  const [pageSize, setPageSize] = useState(7);
  const [downloadCategories, setDownloadCategories] = useState(null);
  const [searchParam, setSearchParam] = useState("nama");
  const router = useRouter();
  const MySwal = withReactContent(Swal);

  console.log(reportPdf);

  const screenSizes = {
    "2xl": 20,
    md: 7,
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

  const downloadPdf = async () => {
    try {
      // Lakukan permintaan GET ke API Route yang Anda buat.
      const response = await fetch(
        "http://localhost:9000/api/kategori/report/pdf",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Report categori"; // Nama file yang akan digunakan saat menyimpan.
        a.click();
      }
    } catch (error) {
      console.error("Error downloading PDF", error);
    }
  };
  const downloadCSV = async () => {
    try {
      // Lakukan permintaan GET ke API Route yang Anda buat.
      const response = await fetch(
        "http://localhost:9000/api/kategori/report/csv",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Report categori"; // Nama file yang akan digunakan saat menyimpan.
        a.click();
      }
    } catch (error) {
      console.error("Error downloading CSV", error);
    }
  };
  const downloadExcel = async () => {
    try {
      // Lakukan permintaan GET ke API Route yang Anda buat.
      const response = await fetch(
        "http://localhost:9000/api/kategori/report/excel",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Report categori"; // Nama file yang akan digunakan saat menyimpan.
        a.click();
      }
    } catch (error) {
      console.error("Error downloading Excel", error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-md px-4 pt-6 shadow-lg">
      <div className="grid lg:grid-cols-5 grid-cols-1 gap-6 mb-6">
        <div className="grid col-span-3">
          <div className="mb-2">{modal} </div>
          <div className=" grid grid-col-1 md:grid-cols-3 gap-2">
            <Button
              className="text-[12px] 2xl:text-lg px-4 rounded-[5px] p-1 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white"
              href=""
              onClick={downloadPdf}
            >
              Download PDF
            </Button>
            <Button
              className="text-[12px] 2xl:text-lg px-4 rounded-[5px] p-1 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white"
              href=""
              onClick={downloadCSV}
            >
              Download CSV
            </Button>
            <Button
              className="text-[12px] 2xl:text-lg px-4 rounded-[5px] p-1 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white"
              href=""
              onClick={downloadExcel}
            >
              Download Excel
            </Button>
          </div>
        </div>
        <div className="col-span-2">
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
      </div>
      <div
        ref={componentRef}
        className="grid gap-3 snap-x overflow-auto scroll-smooth scrollbar-thin  scrollbar-track-gray-200 "
        style={{
          height: "100%",
          width: "100%",
          scrollSnapType: "x mandatory",
        }}
      >
        <div>
          <table className="w-full">
            <thead className="bg-slate-200 border border-gray-300">
              <tr className="border 2xl:text-lg py-3">
                <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                  ID Kategori
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                  Kode Kategori
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                  Nama Kategori
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="">
              {categoryData.data && categoryData.data.length > 0 ? (
                categoryData.data.map((category, index) => (
                  <tr
                    key={index}
                    className="text-center border text-[12px] 2xl:text-[16px] text-black border-gray-300"
                  >
                    <td className="py-2 px-1">{index + 1}</td>
                    <td className="py-2 px-1">{category.kode}</td>
                    <td className="py-2 px-1">{category.nama}</td>
                    <td className="py-2">
                      <div className="flex justify-center gap-2">
                        <div className="flex items-center justify-center">
                          <UpdateKategori {...category} />
                        </div>
                        <div className="flex items-center justify-center">
                          <DeleteKategori
                            id={category.id}
                            nama={category.nama}
                          />
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
  );
}
