import MetaHead from "@/components/MetaHead/metahead";
import LargeCard from "@/components/elements/childtabel/largetabel";
import TambahRoom from "@/components/elements/childtabel/room/addRoom";
import ChildCard from "@/components/elements/childtabel/tabel";
import TabelDataRoom from "@/components/elements/table/room/tabel_data_room";
import Headers from "@/components/header";
import Layout from "@/components/layout/layout";
import Section from "@/components/section/section";
import Sidebar from "@/components/sidebar/sidebar";
import TabelAtasRoom from "@/template/room/tabel_atas";

export default function Room() {
  return (
    <>
      <MetaHead title="Room" description="Welcome to Room" />
      <Section tittle="Room">
        {/* <TabelAtasRoom /> */}
        <div className="grid grid-cols-1 gap-4">
          <TabelDataRoom modal={<TambahRoom />} />
        </div>
      </Section>
    </>
  );
}
