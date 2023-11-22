import TopCards from "@/components/chart/TopChart";
import BarChart from "@/components/chart/BarChart";
import DonatChart from "@/components/chart/DonatChart";
import Section from "@/components/section/section";
import LineChart from "@/components/chart/LineChart";
import TabelDataInventoryDash from "./tabelInventoryDash";
import TabelDataKaryawanDash from "./tabelKaryawanDash";
import KerusakanChart from "@/components/chart/chartKerusakan";

export default function SectionDashboard() {
  return (
    <Section tittle="Dashboard">
      <TopCards />
      <div className="py-4 grid md:grid-cols-3 grid-cols-1 gap-4">
        <div className="md:col-span-2">
          {/* <LineChart /> */}
          <KerusakanChart />
        </div>
        <div className="md:col-span-1">
          <DonatChart />
        </div>
      </div>
      <div>
        {/* className="py-4 grid md:grid-cols-5 grid-cols-1 gap-4" */}
        {/* <div className="md:col-span-2">
          <BarChart />
        </div> */}
        <BarChart />
        {/* <div className="md:col-span-3">
          <KerusakanChart />
        </div> */}
      </div>
      <div className="py-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TabelDataInventoryDash />
        <TabelDataKaryawanDash />
      </div>
    </Section>
  );
}
