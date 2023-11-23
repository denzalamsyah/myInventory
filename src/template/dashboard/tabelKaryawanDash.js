import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
export default function TabelDataKaryawanDash({ modal }) {
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
  console.log(employeeData);
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
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/karyawan/search?${param}=${query}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/karyawan?page=${page}&size=${pageSize}`;
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
    <div className="flex flex-col h-full bg-white rounded-lg px-4 pt-6 shadow-lg">
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
              <tr className="2xl:text-lg py-3">
                <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                  No
                </th>

                <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                  Gambar
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                  No Induk
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                  Email
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                  Lainnya
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
                    <td className="py-2 px-1">{index + 1}</td>
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
                    <td className="py-2 ">{employee.nomorInduk}</td>
                    <td className="py-2 px-1">{employee.email}</td>
                    <td className="py-2">
                      <Link href="/employee" className="text-blue-500">
                        View More..
                      </Link>
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
