import MetaHead from "@/components/MetaHead/metahead";
import TambahKaryawan from "@/components/elements/childtabel/karyawan/addKaryawan";
import LargeCard from "@/components/elements/childtabel/largetabel";
import ChildCard from "@/components/elements/childtabel/tabel";
import TabelDataKaryawan from "@/components/elements/table/karyawan/tabel_data_karyawan";
import Layout from "@/components/layout/layout";
import Section from "@/components/section/section";
import Sidebar from "@/components/sidebar/sidebar";
import TabelAtasKaryawan from "@/template/karyawan/tabel_atas";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
      <Layout>
        <Sidebar />
        <Section>
          <ChildCard tittle="Karyawan" className="overflow-y-auto">
            <TabelAtasKaryawan />
          </ChildCard>
          <TabelDataKaryawan modal={<TambahKaryawan />} />
        </Section>
      </Layout>
    </>
  );
}
