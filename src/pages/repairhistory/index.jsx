import MetaHead from "@/components/MetaHead/metahead";
import LargeCard from "@/components/elements/childtabel/largetabel";
import TabelDataRepairHistory from "@/components/elements/table/repairHistory/tabel_data_usage_history";
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
          <LargeCard>
            <TabelDataRepairHistory />
          </LargeCard>
        </Section>
      </Layout>
    </>
  );
}
