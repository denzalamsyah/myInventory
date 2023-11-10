"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CgMoreO } from "react-icons/cg";
import TabelDetailInventoryComp from "../../table/inventory/tabel_detail_inventory";
import { useRouter } from "next/router";
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
              <TabelDetailInventoryComp {...inventoryData.data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
