"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import TabelDetailInventoryComp from "../../table/inventory/tabel_detail_inventory";
import { useRouter } from "next/router";
import { HiClipboardList } from "react-icons/hi";
import TabelDataRepairHistoryById from "../../table/inventory/tabel_history_perbaikan";
import TabelDataKerusakanHistoryById from "../../table/inventory/tabel_history_kerusakan";
import TabelDataUsageHistoryById from "../../table/inventory/tabel_history_pemakaian";
import TabelBiayaKerusakanById from "../../table/inventory/tabel_biaya_kerusakan";
export default function ReportPerbaikan({ Id }) {
  const [modal, setModal] = useState(false);
  const [inventoryData, setInventoryData] = useState([]);
  const [kerusakanData, setKerusakanData] = useState([]);
  const [pemakaianData, setPemakaianData] = useState([]);
  const [bayarData, setBayarData] = useState([]);
  const [selectHistory, setSelectHistory] = useState("kerusakan");
  const router = useRouter();
  console.log(pemakaianData);
  console.log(kerusakanData);
  console.log(inventoryData);
  console.log(bayarData);
  console.log(Id);
  function handleChange() {
    setModal(!modal);
    // if (!modal) {
    //   setSelectHistory(null);
    // }
  }

  const handleHistoryClick = (historyType) => {
    setSelectHistory(historyType);
  };
  const fetchInventory = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/perbaikan/findAllId/${Id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("response", response);

      if (response.ok) {
        const data = await response.json();
        setInventoryData(data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchKerusakan = async () => {
    try {
      const resKerusakan = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/kerusakan/find/${Id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (resKerusakan.ok) {
        console.log(resKerusakan);
        const kerusakan = await resKerusakan.json();
        setKerusakanData(kerusakan);
      } else {
        throw new Error("Failed to fetch data");
      }
      console.log("response", resKerusakan);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPemakaian = async () => {
    try {
      const resPemakaian = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pemakaian/findAllId/${Id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (resPemakaian.ok) {
        const data = await resPemakaian.json();
        setPemakaianData(data);
      } else {
        throw new Error("Failed to fetch data");
      }
      console.log("response", resPemakaian);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchBayar = async () => {
    try {
      const resBayar = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/perbaikan/biaya/${Id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (resBayar.ok) {
        const data = await resBayar.json();
        setBayarData(data);
      } else {
        throw new Error("Failed to fetch data");
      }
      console.log("response", resBayar);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInventory();
    fetchKerusakan();
    fetchPemakaian();
    fetchBayar();
  }, []);

  return (
    <div>
      <Link
        href=""
        className="text-gray-600 relative group"
        onClick={(e) => {
          e.preventDefault();
          handleChange();
        }}
      >
        <HiClipboardList className="transition duration-150 ease-in-out" />
        <span className="hidden absolute -left-1/4 -top-full bg-gray-600 text-white px-2 py-1 text-[12px] rounded-[3px] opacity-0 group-hover:opacity-100 group-hover:block transition duration-300 ease-in-out z-10">
          History
        </span>
      </Link>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className={`modal ${modal ? "open" : ""}`}>
        <div className="modal-box lg:max-w-[65rem] 2xl:max-w-[75rem] bg-white ">
          <div className="bg-white w-full h-[530px] 2xl:h-[700px] rounded-md p-3">
            <div className="grid grid-cols-1 lg:grid-cols-5 text-left border-b py-2 border-gray-400 mb-3">
              <Link onClick={handleChange} href="">
                <h1 className="text-[10px] md:text-[12px] 2xl:text-[16px] hover:text-blue-400 text-black ">
                  Kembali
                </h1>
              </Link>
              <div className="col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  className={`text-[10px] md:text-[12px] 2xl:text-[16px] ${
                    selectHistory === "kerusakan"
                      ? "text-white bg-slate-700"
                      : "text-slate-700 bg-white"
                  } hover:text-white hover:bg-slate-700 rounded-[5px] border p-2`}
                  onClick={() => handleHistoryClick("kerusakan")}
                >
                  History Kerusakan
                </button>
                <button
                  className={`text-[10px] md:text-[12px] 2xl:text-[16px] ${
                    selectHistory === "biaya"
                      ? "text-white bg-slate-700"
                      : "text-slate-700 bg-white"
                  } hover:text-white hover:bg-slate-700 rounded-[5px] border p-2`}
                  onClick={() => handleHistoryClick("biaya")}
                >
                  Biaya Kerusakan
                </button>
                <button
                  className={`text-[10px] md:text-[12px] 2xl:text-[16px] ${
                    selectHistory === "repair"
                      ? "text-white bg-slate-700"
                      : "text-slate-700 bg-white"
                  } hover:text-white hover:bg-slate-700 rounded-[5px] border p-2`}
                  onClick={() => handleHistoryClick("repair")}
                >
                  History Perbaikan
                </button>
                <button
                  className={`text-[10px] md:text-[12px] 2xl:text-[16px] ${
                    selectHistory === "usage"
                      ? "text-white bg-slate-700"
                      : "text-slate-700 bg-white"
                  } hover:text-white hover:bg-slate-700 rounded-[5px] border p-2`}
                  onClick={() => handleHistoryClick("usage")}
                >
                  History Pemakaian
                </button>
              </div>
            </div>
            <div>
              {selectHistory === "kerusakan" && (
                <TabelDataKerusakanHistoryById {...kerusakanData.data} />
              )}
              {selectHistory === "repair" && (
                <TabelDataRepairHistoryById {...inventoryData.data} />
              )}
              {selectHistory === "usage" && (
                <TabelDataUsageHistoryById {...pemakaianData.data} />
              )}
              {selectHistory === "biaya" && (
                <TabelBiayaKerusakanById {...bayarData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
