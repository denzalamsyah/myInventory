import Link from "next/link";
import { useState, useEffect } from "react";
import { CgMoreO } from "react-icons/cg";
import DeleteKategori from "../../childtabel/kategori/deleteKategori";
import UpdateKategori from "../../childtabel/kategori/updateKategori";
import UpdateRoom from "../../childtabel/room/update";
import DeleteRoom from "../../childtabel/room/deleteRoom";

export default function TabelDataRoom() {
  const [roomData, setRoomData] = useState([]);

  const fetchRoom = async () => {
    try {
      const response = await fetch("http://localhost:8080/ruangan", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      // Log the response to inspect what you received
      console.log(response);

      const data = await response.json();
      setRoomData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  return (
    <table className="table caption-top w-full">
      <thead className="w-auto bg-slate-200">
        <tr>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            ID Ruangan
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Nama Ruangan
          </th>
          <th className="border border-gray-300 py-1 text-gray-800 text-center">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="overflow-scroll">
        {roomData && roomData.length > 0 ? (
          roomData.map((room, index) => (
            <tr
              key={index}
              className="text-center border text-[12px] text-black border-gray-300"
            >
              <td className="border border-gray-300 py-1">{room.idKategori}</td>
              <td className="border border-gray-300 py-1 px-1">{room.nama}</td>

              <td className="flex space-x-2  py-4 justify-center">
                {/* detail */}
                <Link
                  href={`room/details/${room.id}`} // teknik template
                  className="text-[#1570EF]"
                >
                  <CgMoreO className="transition duration-150 ease-in-out" />
                </Link>
                {/* update */}
                <UpdateRoom {...room} />
                {/* delete */}
                <DeleteRoom id={room.id} nama={room.nama} />
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
