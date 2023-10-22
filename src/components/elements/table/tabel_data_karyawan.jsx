import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { CgMoreO } from "react-icons/cg";
import { useState, useEffect } from "react";

export default function TabelDataKaryawan() {
  const [employeeData, setEmployeeData] = useState([]);
  const fetchEmployee = async () => {
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
      setEmployeeData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const handleDelete = (employeeId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus item ini?")) {
      // Lakukan penghapusan item
      fetch(
        `https://functional-zinc-production.up.railway.app/api/karyawan/${employeeId}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => {
          if (response.ok) {
            console.log(`Menghapus item dengan ID: ${employeeId}`);
            // Refresh halaman setelah penghapusan berhasil
            fetchEmployee();
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
            No Induk
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Nama
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Gambar
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Gender
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Email
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Telepon
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Jabatan
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Alamat
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="overflow-scroll">
        {employeeData && employeeData.length > 0 ? (
          employeeData.map((employee, index) => (
            <tr key={index} className="text-center border border-gray-300">
              <td className="border border-gray-300 py-1">
                {employee.nomorInduk}
              </td>
              <td className="border border-gray-300 py-1 px-1 text-left">
                {employee.nama}
              </td>
              <td className="border border-gray-300">{employee.gambar}</td>
              <td className="border border-gray-300">{employee.gender}</td>
              <td className="text-left border border-gray-300 py-1 px-1">
                {employee.email}
              </td>
              <td className="border border-gray-300">{employee.telepon}</td>
              <td className="border border-gray-300">{employee.jabatan}</td>
              <td className="border border-gray-300">{employee.alamat}</td>
              <td className="flex space-x-2 border border-gray-300 py-2 justify-center">
                {/* detail */}
                <Link
                  href={`employee/details/${employee.id}`} // teknik template
                  className="text-[#1570EF]"
                >
                  <CgMoreO className="transition duration-150 ease-in-out" />
                </Link>
                {/* update */}
                <Link
                  href={`employee/edit/${employee.id}`}
                  className="text-[#10A760]"
                >
                  <PiPencilSimpleLineFill />
                </Link>
                {/* delete */}
                <Link
                  href="#"
                  className="text-[#DA3E33F7]"
                  onClick={() => handleDelete(employee.id)}
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
