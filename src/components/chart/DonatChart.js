import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";

// mergistrasi chart

ChartJS.register(ArcElement, Title, Tooltip, Legend);
export default function DonatChart() {
  const [countRepair, setCountRepair] = useState(0);
  const [countNormal, setCountNormal] = useState(0);
  const [countDamage, setCountDamage] = useState(0);

  const fetchData = async () => {
    try {
      const resRepair = await fetch(
        "http://localhost:9000/api/inventory/count-repair",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(resRepair);
      if (resRepair.ok) {
        const data = await resRepair.json();
        setCountRepair(data);
      }

      const resNormal = await fetch(
        "http://localhost:9000/api/inventory/count-normal",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(resNormal);
      if (resNormal.ok) {
        const data = await resNormal.json();
        setCountNormal(data);
      }

      const resDamage = await fetch(
        "http://localhost:9000/api/inventory/count-damage",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(resDamage);
      if (resDamage.ok) {
        const data = await resDamage.json();
        setCountDamage(data);
      }
    } catch {
      console.log("error");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const data = {
    labels: ["Repair", "Normal", "Damage"],
    datasets: [
      {
        label: "Total",
        data: [countRepair, countNormal, countDamage],
        backgroundColor: ["#5499C7", "#45B39D", "#5D6D7E"],
        borderColor: ["#5499C7 ", "#45B39D", "#5D6D7E "],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Status Inventory",
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };
  return (
    <div className="w-full h-full p-4 border rounded-lg shadow-md bg-white flex justify-center">
      <Pie data={data} options={options} />
    </div>
  );
}
