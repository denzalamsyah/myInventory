import MetaHead from "@/components/MetaHead/metahead";
import TambahInventory from "@/components/elements/childtabel/inventory/addInventory";
import ChildCard from "@/components/elements/childtabel/tabel";
import TabelDataInventory from "@/components/elements/table/inventory/tabel_data_inventory";
import Headers from "@/components/header";
import Layout from "@/components/layout/layout";
import Section from "@/components/section/section";
import Sidebar from "@/components/sidebar/sidebar";
import TabelAtasInventori from "@/template/inventory/tabel_atas";

export default function Inventory() {
  return (
    <>
      <MetaHead title="Inventory" description="Welcome to Inventory" />
      <Section tittle="Inventory">
        <TabelAtasInventori />
        <div className="py-4 grid grid-cols-1 gap-4">
          <TabelDataInventory modal={<TambahInventory />} />
        </div>
      </Section>
    </>
  );
}
