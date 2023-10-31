"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { CgMoreO } from "react-icons/cg";
import Button from "../../button/button";
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
        href="#" // teknik template
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
        <div className="modal-box max-w-[60rem] bg-white flex flex-col justify-center items-center">
          <div className="bg-white w-full h-[530px] rounded-md shadow-lg p-10">
            <div className="grid grid-cols-2 text-left border-b border-gray-400 mb-5 pb-3">
              <h1 className="font-bold text-sm text-black">
                {employeeData.nama}
              </h1>
              <div className="text-right">
                <Button className="text-sm rounded-[5px] shadow-lg px-4 py-1 border border-gray-200 hover:text-white hover:bg-black  ">
                  <Link onClick={handleChange} href="#">
                    Back
                  </Link>
                </Button>
              </div>
            </div>
            <div>
              <h1 className="text-left mb-4 w-full text-sm text-gray-800">
                Informasi Details
              </h1>
            </div>
            <div className="flex">
              <TabelDetailKaryawanComp
                id={employeeData.nomorInduk}
                nama={employeeData.nama}
                gender={employeeData.gender}
                email={employeeData.email}
                telepon={employeeData.telepon}
                jabatan={employeeData.jabatan}
                divisi={employeeData.divisi}
                alamat={employeeData.alamat}
              />
              <div className=" w-[100px]">
                <Image
                  src={employeeData.gambar}
                  alt={employeeData.nama}
                  width={100}
                  height={100}
                  className="rounded-[5px] bg-gray-400"
                ></Image>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
