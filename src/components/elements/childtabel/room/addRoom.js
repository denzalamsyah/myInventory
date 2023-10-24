"use client";
import Button from "@/components/elements/button/button";
import FormComp from "@/components/form/form";
import SelectInput from "@/components/form/select";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TambahRoom() {
  const [modal, setModal] = useState(false);
  const [idRuangan, setIdRuangan] = useState("");
  const [namaRuangan, setNamaRuangan] = useState("");
  const router = useRouter();
  function handleChange() {
    setModal(!modal);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("http://localhost:8080/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idRuangan: idRuangan,
        nama: namaRuangan,
      }),
    });
    setIdRuangan("");

    router.refresh();
    setModal(false);
  }
  return (
    <div className="">
      <Button
        className="text-[12px] px-4 rounded-[5px] p-1 hover:text-blue-700 border hover:bg-white border-blue-700 text-white bg-blue-700"
        type="submit"
        onClick={handleChange}
      >
        Add Ruangan
      </Button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box bg-white">
          <h1 className="font-bold text-lg text-black mb-3">
            Tambah Data Ruangan
          </h1>
          <div>
            <div className="mb-2">
              <FormComp
                id="idRuangan"
                type="text"
                onChange={(e) => setIdRuangan(e.target.value)}
                placeholder="Masukan ID Ruangan"
              >
                ID Ruangan
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="namaRuangan"
                type="text"
                onChange={(e) => setNamaRuangan(e.target.value)}
                placeholder="Masukan nama Ruangan"
              >
                Nama Ruangan
              </FormComp>
            </div>

            <div className=" modal-action flex mt-4">
              <Button
                className="bg-blue-600 rounded-[5px] mx-6 text-white text-sm px-4 py-1 hover:bg-green-700"
                onClick={handleSubmit}
              >
                Add
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
