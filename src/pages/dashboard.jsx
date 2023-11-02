import MetaHead from "@/components/MetaHead/metahead";
import Layout from "@/components/layout/layout";
import Sidebar from "@/components/sidebar/sidebar";
import SectionDashboard from "@/template/dashboard/dashboard";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function Dashboard() {
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
      <MetaHead title="Dashboard" description="Welcome to Dashboard" />
      <div className="flex w-screen h-screen max-w-[100wh] max-h-[100vh]">
        <Sidebar />
        <section className="flex-1 bg-slate-200">
          <SectionDashboard />
        </section>
      </div>
    </>
  );
}
