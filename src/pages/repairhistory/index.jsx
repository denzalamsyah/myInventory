import MetaHead from "@/components/MetaHead/metahead";
import TambahKerusakan from "@/components/elements/childtabel/repair/addKerusakan";
import TabelDataKerusakanHistory from "@/components/elements/table/repairHistory/tabel_data_kerusakan_history";
import TabelDataRepairHistory from "@/components/elements/table/repairHistory/tabel_data_repair_history";
import Section from "@/components/section/section";

export default function RepairHistory() {
  return (
    <>
      <MetaHead
        title="Repair History"
        description="Welcome to Repair History"
      />

      <Section tittle="Repair History">
        <div className="grid grid-cols-1 gap-4">
          <TabelDataKerusakanHistory modal={<TambahKerusakan />} />
          <TabelDataRepairHistory />
        </div>
      </Section>
    </>
  );
}
