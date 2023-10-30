import Link from "next/link";
import { useState, useEffect } from "react";
import { CgMoreO } from "react-icons/cg";
import UpdateUsage from "../../childtabel/room/update";
import DeleteUsage from "../../childtabel/room/deleteRoom";

export default function TabelDataUsageHistory() {
  const [usageDataHistory, setUsageData] = useState([]);

  const fetchUsage = async () => {
    try {
      const response = await fetch("http://localhost:8080/pemakaian", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      // Log the response to inspect what you received
      console.log(response);

      const data = await response.json();
      setUsageData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsage();
  }, []);

  return (
    <table className="table caption-top w-full">
      <thead className="w-auto bg-slate-200">
        <tr>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            ID
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Nomor Induk Lama
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Nomor Induk Baru
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Tanggal
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Ruangan Lama
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Ruangan Baru
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            kode Aset
          </th>
        </tr>
      </thead>
      <tbody className="overflow-scroll">
        {usageDataHistory && usageDataHistory.length > 0 ? (
          usageDataHistory.map((usage, index) => (
            <tr
              key={index}
              className="text-center border text-[12px] text-black border-gray-300"
            >
              <td className="border border-gray-300 py-1">{usage.id}</td>
              <td className="border border-gray-300 py-1 px-1">
                {usage.kodeAset}
              </td>
              <td className="border border-gray-300 py-1 px-1">
                {usage.noInduk}
              </td>
              <td className="border border-gray-300 py-1 px-1">
                {usage.idRuangan}
              </td>
              <td className="border border-gray-300 py-1 px-1">
                {usage.idRuangan}
              </td>
              <td className="border border-gray-300 py-1 px-1">
                {usage.idRuangan}
              </td>
              <td className="border border-gray-300 py-1 px-1">
                {usage.idRuangan}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="text-center">
              Tidak ada data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
