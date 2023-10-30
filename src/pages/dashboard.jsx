import MetaHead from "@/components/MetaHead/metahead";
import Layout from "@/components/layout/layout";
import Sidebar from "@/components/sidebar/sidebar";
import SectionDashboard from "@/template/dashboard/dashboard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function Dashboard() {
  const [content, setContent] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    const res = await fetch(`http://localhost:9000/api/karyawan`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (res.ok) {
      const text = await res.text();
      setContent(text);
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
