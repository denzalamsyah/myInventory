"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import TabelDetailInventoryComp from "../../table/inventory/tabel_detail_inventory";
import { useRouter } from "next/router";
import { HiClipboardList } from "react-icons/hi";
import TabelDataRepairHistoryById from "../../table/inventory/tabel_history_perbaikan";
export default function ReportPerbaikan({ Id }) {
  const [modal, setModal] = useState(false);
  const [inventoryData, setInventoryData] = useState([]);
  const router = useRouter();
  console.log(inventoryData);
  console.log(Id);
  function handleChange() {
    setModal(!modal);
  }

  const fetchInventory = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/perbaikan/findAllId/${Id}`,
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
      setInventoryData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <>
      <Link href="" className="text-[#2C3E50] relative" onClick={handleChange}>
        <HiClipboardList className="transition duration-150 ease-in-out" />
        <span className="hidden absolute -left-1/2 -top-full bg-white text-black px-2 py-1 text-sm rounded-md opacity-0 group-hover:opacity-100 group-hover:block transition duration-300 ease-in-out">
          Details
        </span>
      </Link>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box lg:max-w-[65rem] 2xl:max-w-[75rem] bg-white ">
          <div className="bg-white w-full h-[530px] 2xl:h-[700px] rounded-md p-3">
            <div className="grid grid-cols-3 lg:grid-cols-6 text-left border-b py-2 border-gray-400 mb-3">
              <Link onClick={handleChange} href="">
                <h1 className="text-[10px] md:text-[12px] 2xl:text-[16px] hover:text-blue-400 text-black">
                  Kembali
                </h1>
              </Link>
              <p>History Pemakaian</p>
            </div>
            <div>
              <TabelDataRepairHistoryById {...inventoryData.data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
