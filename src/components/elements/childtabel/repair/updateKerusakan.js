"use client";
import Button from "@/components/elements/button/button";
import FormComp from "@/components/form/form";
import SelectInput from "@/components/form/select";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LabelComp from "../../label/label";

export default function UpdateKerusakan({
  id,
  inventoryId,
  TanggalKerusakan,
  Deskripsi,
}) {
  const [modal, setModal] = useState(false);
  // const [repairData, setRepairData] = useState([]);
  const [inventory, setInventory] = useState(inventoryId);
  const [tanggalKerusakan, setTanggalKerusakan] = useState(TanggalKerusakan);
  const [deskripsi, setDeskripsi] = useState(Deskripsi);
  const [tanggalPerbaikan, setTanggalPerbaikan] = useState(null);
  const [nama, setNama] = useState("");
  const [tempat, setTempat] = useState("");
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  console.log(inventory);
  function handleChange() {
    setModal(!modal);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const response = await fetch(`http://localhost:9000/api/kerusakan/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        // inventoryId: inventory,
        tanggalKerusakan: tanggalKerusakan,
        tanggalPerbaikan: tanggalPerbaikan,
        deskripsi: deskripsi,
        tempat: tempat,
        nama: nama,
      }),
    });
    console.log(response);
    if (response.ok) {
      setModal(false);
      MySwal.fire("Sedang diperbaiki", "Klik tombol!", "success").then(() => {
        router.refresh();
      });
    } else {
      MySwal.fire("Gagal diperbaiki", "Klik tombol!", "error");
    }
  }

  return (
    <div className="">
      <Link
        href=""
        onClick={handleChange}
        className="text-[#10A760] relative group"
      >
        <PiPencilSimpleLineFill className="transition duration-150 ease-in-out" />
        <span className="hidden absolute -left-1/4 -top-full bg-[#10A760] text-white px-2 py-1 text-[12px] rounded-[3px] opacity-0 group-hover:opacity-100 group-hover:block transition duration-300 ease-in-out z-10">
          Perbaiki
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
          <h1 className="font-bold text-[16px] text-black mb-3">
            Perbaiki {inventoryId.kodeAsset}
          </h1>
          <div>
            <div className="mb-2">
              <FormComp
                id="tanggalKerusakan"
                type="date"
                onChange={(e) => setTanggalKerusakan(e.target.value)}
                placeholder={TanggalKerusakan}
                value={tanggalKerusakan}
                required
              >
                Tanggal Kerusakan
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="deskripsi"
                type="text"
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder={Deskripsi}
                value={deskripsi}
              >
                Deskripsi
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="tanggalPerbaikan"
                type="date"
                onChange={(e) => setTanggalPerbaikan(e.target.value)}
                // placeholder={TanggalPerbaikan}
                value={tanggalPerbaikan}
                required
              >
                Tanggal Perbaikan
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="nama"
                type="text"
                onChange={(e) => setNama(e.target.value)}
                // placeholder={Biaya}
                value={nama}
              >
                Yang Memperbaiki
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="tempat"
                type="text"
                onChange={(e) => setTempat(e.target.value)}
                // placeholder={Biaya}
                value={tempat}
              >
                Tempat Perbaikan
              </FormComp>
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
