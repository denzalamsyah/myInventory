import MetaHead from "@/components/MetaHead/metahead";
import TambahKategori from "@/components/elements/childtabel/kategori/addKategori";
import LargeCard from "@/components/elements/childtabel/largetabel";
import ChildCard from "@/components/elements/childtabel/tabel";
import TabelDataKategori from "@/components/elements/table/category/tabel_data_kategori";
import Headers from "@/components/header";
import Layout from "@/components/layout/layout";
import Section from "@/components/section/section";
import Sidebar from "@/components/sidebar/sidebar";
import TabelAtasKategori from "@/template/kategori/tabel_atas";

export default function Category() {
  return (
    <>
      <MetaHead title="Category" description="Welcome to Category" />
      <Section tittle="Category">
        {/* <ChildCard tittle="Category" className="overflow-y-auto">
          <TabelAtasKategori />
        </ChildCard> */}
        <div className="grid grid-cols-1 gap-4">
          <TabelDataKategori modal={<TambahKategori />} />
        </div>
      </Section>
    </>
  );
}
