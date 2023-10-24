"use client";
import Button from "@/components/elements/button/button";
import FormComp from "@/components/form/form";
import SelectInput from "@/components/form/select";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TambahKategori() {
  const [modal, setModal] = useState(false);

  // const [idKategori, setIdKategori] = useState("");
  const [namakategori, setNamaKategori] = useState("");
  const router = useRouter();
  function handleChange() {
    setModal(!modal);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("http://localhost:9000/api/kategori", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // idKategori: idKategori,
        nama: namakategori,
      }),
    });
    setIdKategori("");

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
        Add Data Kategori
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
            Tambah Data Kategori
          </h1>
          <div>
            {/* <div className="mb-2">
              <FormComp
                id="idKategori"
                type="text"
                onChange={(e) => setIdKategori(e.target.value)}
                placeholder="Masukan ID kategori"
              >
                ID Kategori
              </FormComp>
            </div> */}
            <div className="mb-2">
              <FormComp
                id="namaKategori"
                type="text"
                onChange={(e) => setNamaKategori(e.target.value)}
                placeholder="Masukan nama kategori"
              >
                Nama Kategori
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
