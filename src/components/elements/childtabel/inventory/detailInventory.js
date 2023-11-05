"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { CgMoreO } from "react-icons/cg";
import Button from "../../button/button";
import TabelDetailInventoryComp from "../../table/inventory/tabel_detail_inventory";
import { useRouter } from "next/router";
export default function DetailInventory(inventory) {
  const [modal, setModal] = useState(false);
  const [inventoryData, setInventoryData] = useState([]);
  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  const fetchInventory = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/inventory/${inventory.id}`,
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
        <div className="modal-box max-w-[70rem] bg-white flex flex-col justify-center items-center">
          <div className="bg-white w-full h-[530px] rounded-md p-10">
            <div className="grid grid-cols-2 text-left border-b border-gray-400 mb-5 pb-1">
              <div>
                <h1 className="font-bold text-sm text-black">
                  {inventoryData.nama}
                </h1>
              </div>
              <div className="flex justify-end space-x-2">
                <Button className="text-sm rounded-[5px] shadow-lg px-4 py-1 border border-gray-200 hover:text-white hover:bg-black  ">
                  <Link onClick={handleChange} href="">
                    History Perbaikan
                  </Link>
                </Button>
                <Button className="text-sm rounded-[5px] shadow-lg px-4 py-1 border border-gray-200 hover:text-white hover:bg-black  ">
                  <Link onClick={handleChange} href="">
                    History Pemakaian
                  </Link>
                </Button>
                <Button className="text-sm rounded-[5px] shadow-lg px-4 py-1 border border-gray-200 hover:text-white hover:bg-black  ">
                  <Link onClick={handleChange} href="">
                    Kembali
                  </Link>
                </Button>
              </div>
            </div>
            <div>
              <h1 className="text-left mb-4 w-full text-sm text-gray-800">
                Informasi Details
              </h1>
            </div>
            <div className="flex gap-8">
              <div>
                <TabelDetailInventoryComp
                  kodeAsset={inventoryData?.kodeAsset}
                  nama={inventoryData?.nama}
                  merk={inventoryData?.merk}
                  masaManfaat={inventoryData?.masaManfaat}
                  tanggalPembelian={inventoryData?.tanggalPembelian}
                  harga={inventoryData?.harga}
                  vendor={inventoryData?.vendor}
                  deskripsi={inventoryData?.deskripsi}
                  kategoriId={inventoryData?.kategoriId}
                  karyawanId={inventoryData?.karyawanId}
                  nilaiResedu={inventoryData?.nilaiResidu}
                  tahun1={inventoryData?.tahun1}
                  tahun2={inventoryData?.tahun2}
                  tahun3={inventoryData?.tahun3}
                  tahun4={inventoryData?.tahun4}
                  depresiasi={inventoryData?.depresiasi}
                  status={inventoryData?.status}
                />
              </div>
              <div className="w-[100px]">
                <Image
                  src={inventoryData?.gambar}
                  alt={inventoryData?.nama}
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
