import Link from "next/link";
import Image from "next/image";
import { CgMoreO } from "react-icons/cg";
import { useState } from "react";
import Button from "@/components/elements/button/button";
import TabelDetailInventoryComp from "@/components/elements/table/inventory/tabel_detail_inventory";
import Sidebar from "@/components/sidebar/sidebar";
import Section from "@/components/section/section";
import Layout from "@/components/layout/layout";

export default function DetailInventori(inventoryData) {
  const [modal, setModal] = useState(false);
  return (
    <Layout>
      <Sidebar></Sidebar>
      <Section>
        <div className="bg-white flex flex-col justify-center items-center">
          <div className="bg-white w-full h-[530px] rounded-md p-10">
            <div className="grid grid-cols-2 text-left border-b border-gray-400 mb-5 pb-1">
              <h1 className="font-bold text-sm text-black">
                {inventoryData?.nama}
              </h1>
              <div className="text-right">
                <Button className="text-sm rounded-[5px] shadow-lg px-4 py-1 border border-gray-200 hover:text-white hover:bg-black  ">
                  <Link href="/inventory">Back</Link>
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
                />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;

  try {
    const response = await fetch(`http://localhost:9000/api/inventory/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log("response", response);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const inventoryData = await response.json();
    console.log(inventoryData);

    return {
      props: {
        inventoryData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        inventoryData: {}, // Handle error by returning empty data
      },
    };
  }
}
