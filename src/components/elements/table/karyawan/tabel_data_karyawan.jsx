import { useState, useEffect, useRef } from "react";
import DeleteKaryawan from "../../childtabel/karyawan/deleteKaryawan";
import UpdateKaryawan from "../../childtabel/karyawan/updateKaryawan";
import Image from "next/image";
import DetailKaryawan from "../../childtabel/karyawan/detailKaryawan";
import { BiSearch } from "react-icons/bi";
import ReactToPrint from "react-to-print";
import Button from "../../button/button";
import DownloadPdfKaryawan from "./downloadPdf";
import DownloadCSVKaryawan from "./downloadCSV";
import DownloadExcelKaryawan from "./downloadExcel";
export default function TabelDataKaryawan({ modal }) {
  const [employeeData, setEmployeeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [screenSize, setScreenSize] = useState("md");
  const [pageSize, setPageSize] = useState(10);
  const componentRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState();
  const [searchParam, setSearchParam] = useState("nama");
  const screenSizes = {
    "2xl": 16,
    md: 10,
  };
  const handleSearch = (e) => {
    e.preventDefault();
    fetchEmployee(currentPage, searchQuery, searchParam); // Gunakan searchQuery
  };
  useEffect(() => {
    fetchEmployee(currentPage, searchQuery, searchParam); // Gunakan searchQuery
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

  const fetchEmployee = async (page, query = "", param) => {
    try {
      const url = query
        ? `http://localhost:9000/api/karyawan/search?${param}=${query}`
        : `http://localhost:9000/api/karyawan?page=${page}&size=${pageSize}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEmployeeData(data);
      } else {
        console.log("data kosong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployee(currentPage);
  }, [currentPage]);

  return (
    <div className="flex flex-col h-full bg-white rounded-md px-4 pt-6 shadow-lg">
      <div className="grid lg:grid-cols-10 grid-cols-1 gap-6 mb-6">
        <div className="grid lg:col-span-5">
          <div className="mb-2">{modal} </div>
          <div className=" grid grid-col-1 md:grid-cols-3 gap-2">
            <DownloadPdfKaryawan />
            <DownloadCSVKaryawan />
            <DownloadExcelKaryawan />
          </div>
        </div>
        <div className="col-span-1 lg:col-span-5 lg:col-start-8">
          <form
            className="grid col-span-1 md:grid-cols-3 border bg-white rounded-[5px] shadow-md py-1 px-3 items-center"
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
              <option value="email">Email</option>
              <option value="telepon">Telepon</option>
            </select>
          </form>
        </div>
      </div>

      <div
        ref={componentRef}
        className=" overflow-auto scroll-smooth scrollbar-thin scrollbar-thumb-red scrollbar-track-gray-200 scrollbar-thumb-hover:#b30000"
        style={{
          height: "100%",
          width: "100%",
          scrollSnapType: "x mandatory",
        }}
      >
        <div>
          <table className="w-full">
            <thead className=" bg-slate-200 border border-gray-300">
              <tr className="2xl:text-[16px] py-3">
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  No Induk
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Nama
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Gambar
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Gender
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Divisi
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Email
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Telepon
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Jabatan
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Alamat
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="">
              {employeeData.data && employeeData.data.length > 0 ? (
                employeeData.data.map((employee, index) => (
                  <tr
                    key={index}
                    className="text-center border text-[12px] 2xl:text-[16px] text-black border-gray-300"
                  >
                    <td className="py-2 ">{employee.nomorInduk}</td>
                    <td className="py-2 px-1 text-left">{employee.nama}</td>
                    <td className=" py-2 px-1">
                      <div className="flex  justify-center items-center">
                        <Image
                          alt={employee.nama}
                          src={employee.gambar}
                          width={25}
                          height={25}
                          className="rounded-md"
                        />
                      </div>
                    </td>
                    <td className="py-2">{employee.gender}</td>
                    <td className="py-2">{employee.divisi}</td>
                    <td className="text-left  py-2 px-1">{employee.email}</td>
                    <td className="py-2">{employee.telepon}</td>
                    <td className="py-2">{employee.jabatan}</td>
                    <td className="py-2">{employee.alamat}</td>
                    <td className="py-2">
                      <div className="flex justify-center gap-2">
                        <div className="flex items-center justify-center">
                          <DetailKaryawan {...employee} />
                        </div>
                        <div className="flex items-center justify-center">
                          {/* update */}
                          <UpdateKaryawan {...employee} />
                        </div>
                        <div className="flex items-center justify-center">
                          {/* delete */}
                          <DeleteKaryawan
                            id={employee.id}
                            nama={employee.nama}
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
          disabled={currentPage === employeeData.totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
}
