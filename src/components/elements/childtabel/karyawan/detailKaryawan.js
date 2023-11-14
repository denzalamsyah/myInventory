"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CgMoreO } from "react-icons/cg";
import TabelDetailKaryawanComp from "../../table/karyawan/tabel_detail_karyawan";
export default function DetailKaryawan(employee) {
  const [modal, setModal] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  console.log(employeeData.data);
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
        <div className="modal-box max-w-[30rem] lg:max-w-[50rem] bg-white flex flex-col justify-center items-center">
          <div className="bg-white w-full h-[470px] p-2">
            <div className="grid grid-cols-2 text-left border-b border-gray-400 mb-5 pb-3">
              <Link onClick={handleChange} href="">
                <h1 className="text-[10px] md:text-[12px] 2xl:text-[16px] hover:text-blue-400 text-black">
                  Kembali
                </h1>
              </Link>
            </div>
            <div className="">
              <h1 className="text-left mb-4 w-full text-[10px] md:text-[12px] 2xl:text-[16px] text-gray-800">
                Informasi Details
              </h1>
            </div>
            <div>
              <TabelDetailKaryawanComp {...employeeData.data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
