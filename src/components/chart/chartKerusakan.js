import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function KerusakanChart() {
  const [inventory, setInventory] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const fetchData = async () => {
    try {
      const year = startDate.getFullYear();
      const resRepair = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/kerusakan/bar-chart?tahun=${year}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (resRepair.ok) {
        const data = await resRepair.json();
        console.log(data);

        // Ubah data dari API menjadi format yang dapat digunakan oleh Chart.js
        const formattedData = data.map((entry) => ({
          bulan: entry.bulan,
          jumlahKerusakan: entry.jumlahKerusakan,
          totalPerbaikan: entry.totalPerbaikan,
        }));

        // Update state chartData
        setChartData({
          labels: formattedData.map((entry) => entry.bulan),
          datasets: [
            {
              label: "Jumlah Kerusakan",
              data: formattedData.map((entry) => entry.jumlahKerusakan),
              backgroundColor: "#5499C7",
              borderColor: "#5499C7",
              borderWidth: 1,
            },
            {
              label: "Biaya Perbaikan",
              data: formattedData.map((entry) => entry.totalPerbaikan),
              backgroundColor: "#EC7063",
              borderColor: "#EC7063",
              borderWidth: 1,
            },
          ],
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate]);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Jumlah Kerusakan",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartOptions({
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Kerusakan Inventory",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Bulan",
          },
        },
        y: {
          title: {
            display: true,
            text: "Jumlah",
          },
        },
      },
    });
  }, []);

  return (
    <div className="grid grid-cols-1  md:grid-cols-3 h-full gap-4 p-4 border rounded-lg shadow-md bg-white">
      <div className="lg:py-10">
        <label className="block text-[12px] 2xl:text-[16px] font-medium text-gray-700">
          Pilih Tahun:
        </label>
        <div className="mt-1 relative rounded-md border ">
          <DatePicker
            className="form-input outline-none py-2 px-3 block rounded-sm bg-white transition duration-150 ease-in-out text-[12px]"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
      </div>
      <div className="col-span-2 min-h-[30vh] md:min-h-[40vh]">
        <Line data={chartData} options={chartOptions} />
        {/* <Line data={chartData} options={chartOptions} /> */}
      </div>
    </div>
  );
}
