"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MdMore } from "react-icons/md";
import TabelDetailInventoryComp from "../../table/inventory/tabel_detail_inventory";
import { useRouter } from "next/router";
import Button from "../../button/button";
export default function DetailInventory({ Id }) {
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
        `http://localhost:9000/api/inventory/${Id}`,
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
      setInventoryData(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <>
      <button className="text-[#1570EF] relative group" onClick={handleChange}>
        <MdMore className="transition duration-150 ease-in-out" />
        <span className="hidden absolute -left-1/4 -top-full bg-[#1570EF] text-white px-2 py-1 text-[12px] rounded-[3px] opacity-0 group-hover:opacity-100 group-hover:block transition duration-300 ease-in-out z-10">
          Details
        </span>
      </button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box max-w-[65rem] bg-white ">
          <div className="bg-white w-full h-[530px] rounded-md p-3">
            <div className="grid grid-cols-3 lg:grid-cols-6 text-left border-b py-2 border-gray-400 mb-3">
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
              <TabelDetailInventoryComp {...inventoryData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
