import MetaHead from "@/components/MetaHead/metahead";
import TambahInventory from "@/components/elements/childtabel/inventory/addInventory";
import ChildCard from "@/components/elements/childtabel/tabel";
import TabelDataInventory from "@/components/elements/table/inventory/tabel_data_inventory";
import Layout from "@/components/layout/layout";
import Section from "@/components/section/section";
import Sidebar from "@/components/sidebar/sidebar";
import TabelAtasInventori from "@/template/inventory/tabel_atas";

export default function Inventory() {
  return (
    <>
      <MetaHead title="Inventory" description="Welcome to Inventory" />
      <Layout>
        <Sidebar></Sidebar>
        <Section>
          <ChildCard
            tittle="Persediaan Keseluruhan"
            className="overflow-y-auto"
          >
            <TabelAtasInventori />
          </ChildCard>
          <TabelDataInventory modal={<TambahInventory />} />
        </Section>
      </Layout>
    </>
  );
}
