import Link from "next/link";
import { CgMoreO } from "react-icons/cg";
import { useState, useEffect } from "react";
import DeleteKaryawan from "../../childtabel/karyawan/deleteKaryawan";
import UpdateKaryawan from "../../childtabel/karyawan/updateKaryawan";
import Image from "next/image";
import DetailKaryawan from "../../childtabel/karyawan/detailKaryawan";
export default function TabelDataKaryawan() {
  const [employeeData, setEmployeeData] = useState([]);
  const fetchEmployee = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/karyawan", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
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
    <table className="table caption-top">
      <thead className="w-auto bg-slate-200">
        <tr className="2xl:text-lg">
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
              className="text-center border text-[12px] 2xl:text-[16px] text-black border-gray-300"
            >
              <td className="border border-gray-300 py-1">
                {employee.nomorInduk}
              </td>
              <td className="border border-gray-300 py-1 px-1 text-left">
                {employee.nama}
              </td>
              <td className="border border-gray-300">
                <Image
                  alt={employee.nama}
                  src={employee.gambar}
                  width={50}
                  height={50}
                />
              </td>
              <td className="border border-gray-300">{employee.gender}</td>
              <td className="text-left border border-gray-300 py-1 px-1">
                {employee.email}
              </td>
              <td className="border border-gray-300">{employee.telepon}</td>
              <td className="border border-gray-300">{employee.jabatan}</td>
              <td className="border border-gray-300">{employee.alamat}</td>
              <td className="grid grid-cols-3 gap-2">
                <DetailKaryawan {...employee} />
                {/* update */}
                <UpdateKaryawan {...employee} />
                {/* delete */}
                <DeleteKaryawan id={employee.nomorInduk} nama={employee.nama} />
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
