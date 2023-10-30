import MetaHead from "@/components/MetaHead/metahead";
import TambahKaryawan from "@/components/elements/childtabel/karyawan/addKaryawan";
import LargeCard from "@/components/elements/childtabel/largetabel";
import ChildCard from "@/components/elements/childtabel/tabel";
import TabelDataKaryawan from "@/components/elements/table/karyawan/tabel_data_karyawan";
import Layout from "@/components/layout/layout";
import Section from "@/components/section/section";
import Sidebar from "@/components/sidebar/sidebar";
import TabelAtasKaryawan from "@/template/karyawan/tabel_atas";

export default function Employee() {
  return (
    <>
      <MetaHead title="Employee" description="Welcome to Employee" />
      <Layout>
        <Sidebar />
        <Section>
          <ChildCard tittle="Karyawan" className="overflow-y-auto">
            <TabelAtasKaryawan />
          </ChildCard>
          <LargeCard modal={<TambahKaryawan />}>
            <TabelDataKaryawan />
          </LargeCard>
        </Section>
      </Layout>
    </>
  );
}
