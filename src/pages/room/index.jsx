import LargeCard from "@/components/elements/childtabel/largetabel";
import TambahRoom from "@/components/elements/childtabel/room/addRoom";
import ChildCard from "@/components/elements/childtabel/tabel";
import TabelDataRoom from "@/components/elements/table/room/tabel_data_room";
import Layout from "@/components/layout/layout";
import Section from "@/components/section/section";
import Sidebar from "@/components/sidebar/sidebar";
import TabelAtasRoom from "@/template/room/tabel_atas";

export default function Room() {
  return (
    <Layout>
      <Sidebar />
      <Section>
        <ChildCard tittle="Room" className="overflow-y-auto">
          <TabelAtasRoom />
        </ChildCard>
        <LargeCard modal={<TambahRoom />}>
          <TabelDataRoom />
        </LargeCard>
      </Section>
    </Layout>
  );
}
