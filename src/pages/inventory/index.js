import LargeCard from "@/components/elements/childtabel/largetabel";
import ChildCard from "@/components/elements/childtabel/tabel";
import Layout from "@/components/layout/layout";
import Section from "@/components/section/section";
import Sidebar from "@/components/sidebar/sidebar";
import TabelAtasInventori from "@/template/inventory/tabel_atas";

export default function Inventory() {
  return (
    <Layout>
      <Sidebar></Sidebar>
      <Section>
        <ChildCard tittle="Persediaan Keseluruhan" className="overflow-y-auto">
          <TabelAtasInventori />
        </ChildCard>
        <LargeCard></LargeCard>
      </Section>
    </Layout>
  );
}
