import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart() {
  const [inventory, setInventory] = useState([]);
  const [selectOption, setSelectOption] = useState(["LA-Asus1"]);
  const fetchData = async () => {
    try {
      const resRepair = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/inventory/`,
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
        setInventory(data.data);
      }
    } catch {
      console.log("error");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  function getRandomColors(count) {
    const availableColors = [
      "#5499C7",
      "#45B39D",
      "#ABB2B9",
      "#283747",
      "#616A6B",
    ];
    const shuffledColors = [...availableColors].sort(() => 0.5 - Math.random());
    return shuffledColors.slice(0, count);
  }

  const depresiasiData = inventory.map((item) => {
    const yearColors = getRandomColors(4);
    return {
      label: item.kodeAsset,
      data: [item.tahun1, item.tahun2, item.tahun3, item.tahun4],
      borderColor: yearColors,
      backgroundColor: yearColors,
      fill: true,
    };
  });

  const filteredData = depresiasiData.filter((item) =>
    selectOption.includes(item.label)
  );
  const chartData = {
    labels: ["Tahun 1", "Tahun 2", "Tahun 3", "Tahun 4"],
    datasets: filteredData,
  };

  const handleAssetSelect = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectOption(selectedOptions);
  };

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartOptions({
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Depresiasi Inventory",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Tahun",
          },
        },
        y: {
          title: {
            display: true,
            text: "Nilai",
          },
        },
      },
    });
  }, []);

  return (
    <div className="grid grid-cols-1  md:grid-cols-3 h-full gap-4 p-4 border rounded-lg shadow-md bg-white">
      <div className="lg:py-10">
        <p className="text-[10px] md:text-[12px] 2xl:text-[16px] mb-4 text-black">
          Pilih Asset
        </p>
        <select
          multiple
          onChange={handleAssetSelect}
          value={selectOption}
          className="p-2 w-full bg-white text-gray-700 border rounded-md focus:none outline-none "
        >
          {inventory.map((item) => (
            <option
              className="text-[10px] md:text-[12px] 2xl:text-[16px] 2xl:px-[12px] mb-1 lg:mb-2 text-black"
              key={item.id}
              value={item.kodeAsset}
            >
              {item.kodeAsset}
            </option>
          ))}
        </select>
      </div>
      <div className="col-span-2 min-h-[30vh] md:min-h-[40vh]">
        <Bar data={chartData} options={chartOptions} />
        {/* <Line data={chartData} options={chartOptions} /> */}
      </div>
    </div>
  );
}
