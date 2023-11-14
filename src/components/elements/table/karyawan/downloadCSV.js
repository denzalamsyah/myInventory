"use client";
import Button from "@/components/elements/button/button";
import { useState } from "react";

export default function DownloadCSVKaryawan() {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange() {
    setModal(!modal);
  }

  const downloadCSV = async () => {
    try {
      // Lakukan permintaan GET ke API Route yang Anda buat.
      const response = await fetch(
        "http://localhost:9000/api/karyawan/report/csv",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Report categori"; // Nama file yang akan digunakan saat menyimpan.
        a.click();
      }
    } catch (error) {
      console.error("Error downloading CSV", error);
    }
  };
  return (
    <>
      <Button
        className="text-[12px] 2xl:text-[16px] px-4 rounded-[5px] p-1 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white"
        href=""
        onClick={handleChange}
      >
        Download CSV
      </Button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box bg-white flex flex-col justify-center items-center">
          <h1 className="font-bold text-lg text-black mb-3 mt-3">
            Are you sure to download!
          </h1>
          <div className="modal-action flex mt-4">
            {!loading ? (
              <Button
                className="bg-green-400 rounded-[5px] mx-2 text-white text-sm px-4 py-1 hover:bg-red-600 "
                type="button"
                onClick={downloadCSV}
              >
                Yes
              </Button>
            ) : (
              <div className=" w-full bg-green-400 px-4 p-2 rounded-md flex justify-center">
                <span className="loading loading-spinner text-neutral">
                  Yes
                </span>
              </div>
            )}
            <Button
              className=" text-black rounded-[5px] text-sm shadow-lg mx-2 px-4 py-1 border border-gray-200 hover:bg-gray-500 hover:text-white"
              onClick={handleChange}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
