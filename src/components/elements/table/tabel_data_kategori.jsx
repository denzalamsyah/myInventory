import Link from "next/link";
import { FaTrash } from "react-icons/fa";

import { useState, useEffect } from "react";

export default function TabelDataKategori() {
  const [categoryData, setCategoryData] = useState([]);
  const fetchCategory = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        "https://functional-zinc-production.up.railway.app/api/kategori",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
  const handleDelete = (categoryId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus item ini?")) {
      // Lakukan penghapusan item
      fetch(
        `https://functional-zinc-production.up.railway.app/api/kategori/${categoryId}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => {
          if (response.ok) {
            console.log(`Menghapus item dengan ID: ${categoryId}`);
            // Refresh halaman setelah penghapusan berhasil
            window.location.reload();
          } else {
            console.error("Gagal menghapus item.");
          }
        })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
        });
    }
  };
  return (
    <table className="caption-top w-full overflow-scroll">
      <thead className="w-auto bg-slate-200">
        <tr>
          <th className="border text-[12px] text-gray-800 border-gray-300 py-1">
            ID Kategori
          </th>
          <th className="border text-[12px] text-gray-800 border-gray-300 py-1">
            Nama Kategori
          </th>
          <th className="border text-[12px] text-gray-800 border-gray-300 py-1">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {categoryData && categoryData.length > 0 ? (
          categoryData.map((category, index) => (
            <tr
              key={index}
              className="text-center border text-[12px] border-gray-300"
            >
              <td className="border border-gray-300 py-1">{category.id}</td>
              <td className="border border-gray-300 py-1 px-1">
                {category.nama}
              </td>
              <td className="border border-gray-300 py-2 tex-center">
                {/* delete */}
                <Link
                  href="#"
                  className="text-[#DA3E33F7] flex items-center justify-center"
                  onClick={() => handleDelete(category.id)}
                >
                  <FaTrash />
                </Link>
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
