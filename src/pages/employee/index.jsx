import MetaHead from "@/components/MetaHead/metahead";
import TambahKaryawan from "@/components/elements/childtabel/karyawan/addKaryawan";
import ChildCard from "@/components/elements/childtabel/tabel";
import TabelDataKaryawan from "@/components/elements/table/karyawan/tabel_data_karyawan";
import Section from "@/components/section/section";
import TabelAtasKaryawan from "@/template/karyawan/tabel_atas";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Headers from "@/components/header";

export default function Employee() {
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  useEffect(() => {
    fetchProfile();
  }, []);
  async function fetchProfile() {
    const res = await fetch("http://localhost:9000/api/karyawan", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (!res.ok) {
      router.push("/login");
      MySwal.fire("Login dulu", "Klik tombol!", "error");
    }
  }
  return (
    <>
      <MetaHead title="Employee" description="Welcome to Employee" />
      <Section tittle="Employee">
        <TabelAtasKaryawan />
        <div className="grid grid-cols-1 gap-4 py-4">
          <TabelDataKaryawan modal={<TambahKaryawan />} />
        </div>
      </Section>
    </>
  );
}
