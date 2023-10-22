import Navbar from "@/components/navbar/navbar";
import Item1 from "./item1";
import Item2 from "./item2";
import Item3 from "./item3";

export default function SectionDashboard() {
  return (
    <div className="flex flex-col gap-4 w-full h-full max-w-full max-h-full px-10">
      <Navbar />
      <Item1 />
      <Item2 />
      <Item3 />
    </div>
  );
}
