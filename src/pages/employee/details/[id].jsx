import Button from "@/components/elements/button/button";
import TabelDetailKaryawanComp from "@/components/elements/table/karyawan/tabel_detail_karyawan";
import Layout from "@/components/layout/layout";
import Section from "@/components/section/section";
import Sidebar from "@/components/sidebar/sidebar";
import Image from "next/image";
import Link from "next/link";
export default function DetailKaryawan({ data }) {
  return (
    <Layout>
      <Sidebar />
      <Section>
        <div className="bg-white w-full h-[530px] rounded-md shadow-lg p-10">
          <div className="grid grid-cols-2 border-b border-gray-400 mb-5 pb-3">
            <h1 className="font-bold text-sm text-black">{data.nama}</h1>
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
              id={data.id}
              nama={data.nama}
              gender={data.gender}
              email={data.email}
              telepon={data.telepon}
              jabatan={data.jabatan}
              divisi={data.divisi}
              alamat={data.alamat}
            />
            <div className=" w-[100px]">
              <Image
                src={data.gambar}
                alt={data.nama}
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

export async function getServerSideProps(context) {
  const id = context.query.id;
  console.log("id", id);

  const response = await fetch(`http://localhost:5000/employee/${id}`);
  const data = await response.json();
  return {
    props: { data: data },
  };
}
