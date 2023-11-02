import MetaHead from "@/components/MetaHead/metahead";
import TambahPerbaikan from "@/components/elements/childtabel/repair/addRepair";
import TabelDataRepairHistory from "@/components/elements/table/repairHistory/tabel_data_repair_history";
import Layout from "@/components/layout/layout";
import Section from "@/components/section/section";
import Sidebar from "@/components/sidebar/sidebar";

export default function RepairHistory() {
  return (
    <>
      <MetaHead
        title="Repair History"
        description="Welcome to Repair History"
      />
      <Layout>
        <Sidebar />
        <Section>
          <TabelDataRepairHistory modal={<TambahPerbaikan />} />
        </Section>
      </Layout>
    </>
  );
}
