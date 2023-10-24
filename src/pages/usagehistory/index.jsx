import LargeCard from "@/components/elements/childtabel/largetabel";
import TambahRoom from "@/components/elements/childtabel/room/addRoom";
import ChildCard from "@/components/elements/childtabel/tabel";
import TambahUsage from "@/components/elements/childtabel/usage/addUsage";
import TabelDataRoom from "@/components/elements/table/room/tabel_data_room";
import TabelDataUsage from "@/components/elements/table/usage/tabel_data_usage";
import Layout from "@/components/layout/layout";
import Section from "@/components/section/section";
import Sidebar from "@/components/sidebar/sidebar";
import TabelAtasRoom from "@/template/room/tabel_atas";
import TabelAtasUsage from "@/template/usage/tabel_atas";

export default function UsageHistory() {
  return (
    <Layout>
      <Sidebar />
      <Section>
        <ChildCard tittle="Pemakaian" className="overflow-y-auto">
          <TabelAtasUsage />
        </ChildCard>
        <LargeCard modal={<TambahUsage />}>
          <TabelDataUsage />
        </LargeCard>
      </Section>
    </Layout>
  );
}
