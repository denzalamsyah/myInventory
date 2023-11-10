import { useState, useEffect } from "react";
import ReactToPrint from "react-to-print";
import Button from "../../button/button";
import { BiSearch } from "react-icons/bi";
import { useRef } from "react";
export default function TabelDataRepairHistoryById(inventoryData) {
  console.log(inventoryData);

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
    <div className="flex flex-col h-full bg-white">
      <div className="grid lg:grid-cols-5 grid-cols-1 gap-6 mb-6">
        <div className="grid col-span-3">
          <div className=" grid grid-col-1 md:grid-cols-3 gap-2">
            <Button
              className="text-[12px] 2xl:text-[16px] px-4 rounded-[5px] p-1 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white"
              href=""
              onClick={downloadPdf}
            >
              Download PDF
            </Button>
            <Button
              className="text-[12px] 2xl:text-[16px] px-4 rounded-[5px] p-1 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white"
              href=""
              onClick={downloadCSV}
            >
              Download CSV
            </Button>
            <Button
              className="text-[12px] 2xl:text-[16px] px-4 rounded-[5px] p-1 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white"
              href=""
              onClick={downloadExcel}
            >
              Download Excel
            </Button>
          </div>
        </div>
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
              <tr className="2xl:text-[16px] py-3 border">
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
                  Tanggal Perbaikan
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Biaya
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Tanggal Selesai Diperbaiki
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Deskripsi
                </th>
              </tr>
            </thead>
            <tbody className="">
              {Object.keys(inventoryData).map((key, index) => {
                const data = inventoryData[key];
                console.log(data);
                return (
                  <tr
                    key={key}
                    className="text-center border text-[12px] 2xl:text-[16px] text-black border-gray-300"
                  >
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2 px-1">{data.inventoryId.kodeAsset}</td>
                    <td className="py-2 px-1">{data.tanggalKerusakan}</td>
                    <td className="py-2 px-1">{data.tanggalPerbaikan}</td>
                    <td className="py-2 px-1">{data.biaya}</td>
                    <td className="py-2 px-1">
                      {data.tanggalSelesaiPerbaikan}
                    </td>
                    <td className="py-2 px-1">{data.deskripsi}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
