"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { MdMore } from "react-icons/md";
import TabelDetailKaryawanComp from "../../table/karyawan/tabel_detail_karyawan";
import TabelDetailRoomComp from "../../table/room/tabel_detail_room";
export default function DetailRoom(room) {
  const [modal, setModal] = useState(false);
  const [roomData, setRoomData] = useState([]);
  console.log(roomData.data);
  function handleChange() {
    setModal(!modal);
  }

  const fetchRoom = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/ruangan/${room.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("response", response);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
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
    <>
      <Link
        href=""
        className="text-[#1570EF] relative group"
        onClick={handleChange}
      >
        <MdMore className="transition duration-150 ease-in-out" />
        <span className="hidden absolute -left-1/4 -top-full bg-[#1570EF] text-white px-2 py-1 text-[12px] rounded-[3px] opacity-0 group-hover:opacity-100 group-hover:block transition duration-300 ease-in-out z-10">
          Details
        </span>
      </Link>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box max-w-[30rem] lg:max-w-[50rem] bg-white flex flex-col justify-center items-center">
          <div className="bg-white w-full h-[300px] p-2">
            <div className="grid grid-cols-2 text-left border-b border-gray-400 mb-5 pb-3">
              <Link onClick={handleChange} href="">
                <h1 className="text-[10px] md:text-[12px] 2xl:text-[16px] hover:text-blue-400 text-black">
                  Kembali
                </h1>
              </Link>
            </div>
            <div className="">
              <h1 className="text-left mb-4 w-full text-[10px] md:text-[12px] 2xl:text-[16px] text-gray-800">
                Informasi Details
              </h1>
            </div>
            <div>
              <TabelDetailRoomComp {...roomData.data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
