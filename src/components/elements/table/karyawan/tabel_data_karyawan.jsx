import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { CgMoreO } from "react-icons/cg";
import { useState, useEffect } from "react";
import DeleteKaryawan from "../../childtabel/karyawan/deleteKaryawan";
import UpdateKaryawan from "../../childtabel/karyawan/updateKaryawan";

export default function TabelDataKaryawan() {
  const [employeeData, setEmployeeData] = useState([]);
  const fetchEmployee = async () => {
    try {
      const response = await fetch("http://localhost:5000/employee", {
        method: "GET",
      });

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
            <tr
              key={index}
              className="text-center border text-[12px] text-black border-gray-300"
            >
              <td className="border border-gray-300 py-1">
                {employee.noInduk}
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
              <td className="flex space-x-2  py-4 justify-center">
                {/* detail */}
                <Link
                  href={`employee/details/${employee.id}`} // teknik template
                  className="text-[#1570EF]"
                >
                  <CgMoreO className="transition duration-150 ease-in-out" />
                </Link>
                {/* update */}
                <UpdateKaryawan {...employee} />
                {/* delete */}
                <DeleteKaryawan id={employee.id} nama={employee.nama} />
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
