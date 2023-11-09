"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CgMoreO } from "react-icons/cg";
import TabelDetailKaryawanComp from "../../table/karyawan/tabel_detail_karyawan";
export default function DetailKaryawan(employee) {
  const [modal, setModal] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);

  function handleChange() {
    setModal(!modal);
  }

  const fetchEmployee = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/karyawan/${employee.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("response", response);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
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
    <>
      <Link
        href="" // teknik template
        className="text-[#1570EF]"
        onClick={handleChange}
      >
        <CgMoreO className="transition duration-150 ease-in-out" />
      </Link>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box max-w-[30rem] bg-white flex flex-col justify-center items-center">
          <div className="bg-white w-full h-[470px] 2xl:h-[550px] p-2">
            <div className="grid grid-cols-2 text-left border-b border-gray-400 mb-5 pb-3">
              <Link onClick={handleChange} href="">
                <h1 className="text-[10px] md:text-[12px] hover:text-blue-400 text-black">
                  Kembali
                </h1>
              </Link>
            </div>
            <div className="px-4">
              <h1 className="text-left mb-4 w-full text-[12px] text-gray-800">
                Informasi Details
              </h1>
            </div>
            <div>
              <TabelDetailKaryawanComp
                id={employeeData.id}
                nama={employeeData.nama}
                gender={employeeData.gender}
                email={employeeData.email}
                telepon={employeeData.telepon}
                jabatan={employeeData.jabatan}
                divisi={employeeData.divisi}
                alamat={employeeData.alamat}
                gambar={employeeData.gambar}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
