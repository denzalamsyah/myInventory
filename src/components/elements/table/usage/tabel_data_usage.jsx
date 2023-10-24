import Link from "next/link";
import { useState, useEffect } from "react";
import { CgMoreO } from "react-icons/cg";
import UpdateUsage from "../../childtabel/room/update";
import DeleteUsage from "../../childtabel/room/deleteRoom";

export default function TabelDataUsage() {
  const [usageData, setUsageData] = useState([]);

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
            Kode Aset
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            No Induk
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            ID Ruangan
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="overflow-scroll">
        {usageData && usageData.length > 0 ? (
          usageData.map((usage, index) => (
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
              <td className="flex space-x-2  py-4 justify-center">
                {/* detail */}
                <Link
                  href={`usage/details/${usage.id}`} // teknik template
                  className="text-[#1570EF]"
                >
                  <CgMoreO className="transition duration-150 ease-in-out" />
                </Link>
                {/* update */}
                <UpdateUsage {...usage} />
                {/* delete */}
                <DeleteUsage id={usage.id} nama={usage.nama} />
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
