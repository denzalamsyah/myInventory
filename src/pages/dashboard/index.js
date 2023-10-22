import Layout from "@/components/layout/layout";
import Sidebar from "@/components/sidebar/sidebar";
import SectionDashboard from "@/template/dashboard/dashboard";

export default function Dashboard() {
  return (
    <Layout>
      <Sidebar />
      <section className="flex-1 bg-slate-200">
        <SectionDashboard />
      </section>
    </Layout>
  );
}
