import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import DeleteKaryawan from "../../childtabel/karyawan/deleteKaryawan";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { CgMoreO } from "react-icons/cg";
import DeleteKategori from "../../childtabel/kategori/deleteKategori";
import UpdateKategori from "../../childtabel/kategori/updateKategori";

export default function TabelDataKategori() {
  const [categoryData, setCategoryData] = useState([]);

  const fetchCategory = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/kategori", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      // Log the response to inspect what you received
      console.log(response);

      const data = await response.json();
      setCategoryData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <table className="table caption-top w-full">
      <thead className="w-auto bg-slate-200">
        <tr className="text-[12px] 2xl:text-lg">
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            ID Kategori
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Nama Kategori
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="overflow-scroll">
        {categoryData && categoryData.length > 0 ? (
          categoryData.map((category, index) => (
            <tr
              key={index}
              className="text-center border text-[12px] 2xl:text-[16px] text-black border-gray-300"
            >
              <td className="border border-gray-300 py-1">{category.id}</td>
              <td className="border border-gray-300 py-1 px-1">
                {category.nama}
              </td>

              <td className="flex space-x-2  py-4 justify-center">
                {/* detail */}
                <Link
                  href={`category/details/${category.id}`} // teknik template
                  className="text-[#1570EF]"
                >
                  <CgMoreO className="transition duration-150 ease-in-out" />
                </Link>
                {/* update */}
                <UpdateKategori {...category} />
                {/* delete */}
                <DeleteKategori id={category.id} nama={category.nama} />
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
  );
}
