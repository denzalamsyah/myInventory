import MetaHead from "@/components/MetaHead/metahead";
import LargeCard from "@/components/elements/childtabel/largetabel";
import TambahUsage from "@/components/elements/childtabel/usage/addUsage";
import TabelDataUsageHistory from "@/components/elements/table/usageHistory/tabel_data_usage_history";
import Layout from "@/components/layout/layout";
import Section from "@/components/section/section";
import Sidebar from "@/components/sidebar/sidebar";

export default function UsageHistory() {
  return (
    <>
      <MetaHead title="Usage History" description="Welcome to Usage History" />
      <Layout>
        <Sidebar />
        <Section>
          <LargeCard>
            <TabelDataUsageHistory />
          </LargeCard>
        </Section>
      </Layout>
    </>
  );
}
