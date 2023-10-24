"use client";
import Button from "@/components/elements/button/button";
import FormComp from "@/components/form/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiPencilSimpleLineFill } from "react-icons/pi";

export default function UpdateUsage(usage) {
  const [modal, setModal] = useState(false);
  const [idPemakaian, setIdPemakaian] = useState(usage.idPemakaian);
  const [kodeAset, setKodeAset] = useState(usage.kodeAset);
  const [noInduk, setNoInduk] = useState(usage.noInduk);
  const [idRuangan, setIdRuangan] = useState(usage.idRuangan);
  const router = useRouter();
  function handleChange() {
    setModal(!modal);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    await fetch(`http://localhost:8080/usage/${usage.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idPemakaian: idPemakaian,
        kodeAset: kodeAset,
        noInduk: noInduk,
        idRuangan: idRuangan,
      }),
    });

    router.refresh();
    setModal(false);
  }
  return (
    <div className="">
      <Link className="text-[#10A760]" href="" onClick={handleChange}>
        <PiPencilSimpleLineFill />
      </Link>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box bg-white">
          <h1 className="font-bold text-lg text-black mb-3">
            Edit Pemakaian {usage.nama}
          </h1>
          <div>
            <div className="mb-2">
              <FormComp
                id="idPemakaian"
                type="number"
                onChange={(e) => setIdPemakaian(e.target.value)}
                placeholder={usage.idPemakaian}
              >
                ID Pemakaian
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="kodeAset"
                type="text"
                onChange={(e) => setKodeAset(e.target.value)}
                placeholder={usage.kodeAset}
              >
                Kode Aset
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="noInduk"
                type="number"
                onChange={(e) => setNoInduk(e.target.value)}
                placeholder={usage.noInduk}
              >
                Nomor Induk
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="idRuangan"
                type="number"
                onChange={(e) => setIdRuangan(e.target.value)}
                placeholder={usage.idRuangan}
              >
                ID Ruangan
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
