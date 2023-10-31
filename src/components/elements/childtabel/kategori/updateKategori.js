"use client";
import Button from "@/components/elements/button/button";
import FormComp from "@/components/form/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function UpdateKategori(category) {
  const [modal, setModal] = useState(false);
  // const [idKategori, setIdKategori] = useState(category.idKategori);
  const [namakategori, setNamaKategori] = useState(category.nama);
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  function handleChange() {
    setModal(!modal);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:9000/api/kategori/${category.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          nama: namakategori,
        }),
      }
    );
    if (response.ok) {
      setModal(false);
      MySwal.fire("Updated!", "Klik tombol!", "success").then(() => {
        router.refresh();
      });
    } else {
      MySwal.fire("Update Gagal", "Klik tombol!", "error");
    }
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
            Edit kategori {category.nama}
          </h1>
          <div>
            {/* <div className="mb-2">
              <FormComp
                id="idKategori"
                type="text"
                onChange={(e) => setIdKategori(e.target.value)}
                placeholder={category.idKategori}
              >
                ID Kategori
              </FormComp>
            </div> */}
            <div className="mb-2">
              <FormComp
                id="namaKategori"
                type="text"
                onChange={(e) => setNamaKategori(e.target.value)}
                placeholder={category.nama}
              >
                Nama Kategori
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
