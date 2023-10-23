import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { CgMoreO } from "react-icons/cg";
import { useState, useEffect } from "react";

export default function TabelDataInventory() {
  const [inventoryData, setInventoryData] = useState([]);
  const fetchInventory = async () => {
    try {
      const response = await fetch(
        "https://functional-zinc-production.up.railway.app/api/karyawan",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      // Log the response to inspect what you received
      console.log(response);

      const data = await response.json();
      setInventoryData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleDelete = (inventoryId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus item ini?")) {
      // Lakukan penghapusan item
      fetch(
        `https://functional-zinc-production.up.railway.app/api/karyawan/${inventoryId}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => {
          if (response.ok) {
            console.log(`Menghapus item dengan ID: ${inventoryId}`);
            // Refresh halaman setelah penghapusan berhasil
            fetchInventory();
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
    <table className="table caption-top w-full">
      <thead className="w-auto bg-slate-200">
        <tr>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Kode Aset
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Nama
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Gambar
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Merk
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Tanggal Pembelian
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Harga
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            ruangan
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Status
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Nomor Induk
          </th>
        </tr>
      </thead>
      <tbody className="overflow-scroll">
        {inventoryData && inventoryData.length > 0 ? (
          inventoryData.map((inventory, index) => (
            <tr key={index} className="text-center border border-gray-300">
              <td className="border border-gray-300 py-1">
                {inventory.nomorInduk}
              </td>
              <td className="border border-gray-300 py-1 px-1 text-left">
                {inventory.nama}
              </td>
              <td className="border border-gray-300">{inventory.gambar}</td>
              <td className="border border-gray-300">{inventory.gender}</td>
              <td className="text-left border border-gray-300 py-1 px-1">
                {inventory.email}
              </td>
              <td className="border border-gray-300">{inventory.telepon}</td>
              <td className="border border-gray-300">{inventory.jabatan}</td>
              <td className="border border-gray-300">{inventory.alamat}</td>
              <td className="flex space-x-2 border border-gray-300 py-2 justify-center">
                {/* detail */}
                <Link
                  href={`inventory/details/${inventory.id}`} // teknik template
                  className="text-[#1570EF]"
                >
                  <CgMoreO className="transition duration-150 ease-in-out" />
                </Link>
                {/* update */}
                <Link
                  href={`inventory/edit/${inventory.id}`}
                  className="text-[#10A760]"
                >
                  <PiPencilSimpleLineFill />
                </Link>
                {/* delete */}
                <Link
                  href="#"
                  className="text-[#DA3E33F7]"
                  onClick={() => handleDelete(inventory.id)}
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
