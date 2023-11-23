import MetaHead from "@/components/MetaHead/metahead";
import TopCards from "@/components/chart/TopChart";
import Headers from "@/components/header";
import Section from "@/components/section/section";
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/karyawan`, {
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
      <SectionDashboard />
    </>
  );
}
