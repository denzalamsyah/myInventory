import MetaHead from "@/components/MetaHead/metahead";
import TambahPerbaikan from "@/components/elements/childtabel/repair/addRepair";
import TabelDataRepairHistory from "@/components/elements/table/repairHistory/tabel_data_repair_history";
import Headers from "@/components/header";
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

      <Section tittle="Repair History">
        <div className="grid grid-cols-1 gap-4">
          <TabelDataRepairHistory modal={<TambahPerbaikan />} />
        </div>
      </Section>
    </>
  );
}
