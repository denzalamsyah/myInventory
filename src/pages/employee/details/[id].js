import Button from "@/components/elements/button/button";
import TabelDetailKaryawanComp from "@/components/elements/table/tabel_detail_karyawan";
import Layout from "@/components/layout/layout";
import Section from "@/components/section/section";
import Sidebar from "@/components/sidebar/sidebar";
import Image from "next/image";
import Link from "next/link";
export default function DetailKaryawan() {
  return (
    <Layout>
      <Sidebar />
      <Section>
        <div className="bg-white w-full h-[500px] rounded-md shadow-lg p-10">
          <div className="grid grid-cols-2 border-b border-gray-400 mb-5 pb-3">
            <h1 className="font-bold text-sm text-black">Nama</h1>
            <div className="text-right">
              <Button className="text-sm rounded-[5px] shadow-lg px-4 py-1 border border-gray-200 hover:text-white hover:bg-black  ">
                <Link href="/employee">Back</Link>
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
              id="001"
              nama="Rizwan"
              gender="Laki-laki"
              email="a@a.com"
              jabatan="Manager"
              divisi="IT"
              alamat="Jalan"
              telepon="08123456789"
            />
            <div className=" w-[100px]">
              <Image
                src="/img/user.png"
                alt="Image User"
                width={100}
                height={100}
                className="rounded-[5px] bg-gray-400"
              ></Image>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
