"use client";
import Button from "@/components/elements/button/button";
import FormComp from "@/components/form/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LabelComp from "../../label/label";

export default function UpdatePerbaikan({ id }) {
  const [modal, setModal] = useState(false);
  const [biaya, setBiaya] = useState(0);

  const [tanggalSelesaiPerbaikan, setTanggalSelesaiPerbaikan] = useState(null);
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  function handleChange() {
    setModal(!modal);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const response = await fetch(`http://localhost:9000/api/perbaikan/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        biaya: biaya,
        tanggalSelesaiPerbaikan: tanggalSelesaiPerbaikan,
      }),
    });
    console.log(response);
    if (response.ok) {
      setModal(false);
      MySwal.fire("Selesai diperbaiki", "Klik tombol!", "success").then(() => {
        router.refresh();
      });
    } else {
      MySwal.fire("Gagal dioerbaiki", "Klik tombol!", "error");
    }
  }

  return (
    <div className="">
      <Link
        href=""
        onClick={handleChange}
        className="text-blue-500 relative group"
      >
        <PiPencilSimpleLineFill className="transition duration-150 ease-in-out" />
        <span className="hidden absolute -left-1/4 -top-full bg-blue-500 text-white px-2 py-1 text-[12px] rounded-[3px] opacity-0 group-hover:opacity-100 group-hover:block transition duration-300 ease-in-out z-10">
          Selesai
        </span>
      </Link>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box bg-white">
          <h1 className="font-bold text-[16px] text-black mb-3">Perbaiki</h1>
          <div>
            <div className="mb-2">
              <FormComp
                id="biaya"
                type="number"
                onChange={(e) => setBiaya(e.target.value)}
                // placeholder={Biaya}
                value={biaya}
              >
                Biaya
              </FormComp>
            </div>
            <div className="mb-2">
              <div className="flex justify-center items-center">
                <LabelComp
                  htmlFor="tanggalSelesai"
                  className="text-gray-600 w-48 text-sm"
                >
                  Tanggal Selesai Perbaikan
                </LabelComp>
                <input
                  id="tanggaSelesaiPerbaikan"
                  className="px-[20px] py-1 w-full text-sm text-gray-700 border rounded-md focus:none outline-none bg-white"
                  type="date"
                  onChange={(e) => setTanggalSelesaiPerbaikan(e.target.value)}
                  // placeholder={TanggalSelesaiPerbaikan}
                  value={tanggalSelesaiPerbaikan}
                />
              </div>
            </div>

            <div className=" modal-action flex mt-4">
              <Button
                className="bg-blue-600 rounded-[5px] mx-6 text-white text-sm px-4 py-1 hover:bg-green-700"
                onClick={handleUpdate}
              >
                Update
              </Button>
              <Button
                className=" text-black rounded-[5px] text-sm shadow-lg px-4 py-1 border border-gray-200 hover:bg-gray-500 hover:text-white"
                onClick={handleChange}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
