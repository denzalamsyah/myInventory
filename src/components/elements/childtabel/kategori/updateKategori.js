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
  const [kodeKategori, setKodeKategori] = useState(category.kode);
  const [namakategori, setNamaKategori] = useState(category.nama);
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState(false);

  function handleChange() {
    setModal(!modal);
  }

  async function handleUpdate(e) {
    setLoading(true);
    e.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/kategori/${category.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          nama: namakategori,
          kode: kodeKategori,
        }),
      }
    );
    setLoading(false);
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
      <Link
        href=""
        onClick={handleChange}
        className="text-[#10A760] relative group"
      >
        <PiPencilSimpleLineFill className="transition duration-150 ease-in-out" />
        <span className="hidden absolute -left-1/4 -top-full bg-[#10A760] text-white px-2 py-1 text-[12px] rounded-[3px] opacity-0 group-hover:opacity-100 group-hover:block transition duration-300 ease-in-out z-10">
          Update
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
          <h1 className="font-bold text-lg text-black mb-3">
            Edit kategori {category.nama}
          </h1>
          <div>
            <div className="mb-2">
              <FormComp
                id="kodeKategori"
                type="text"
                onChange={(e) => setKodeKategori(e.target.value)}
                placeholder={category.kode}
                value={kodeKategori}
              >
                Kode Kategori
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="namaKategori"
                type="text"
                onChange={(e) => setNamaKategori(e.target.value)}
                placeholder={category.nama}
                value={namakategori}
              >
                Nama Kategori
              </FormComp>
            </div>
            <div className=" modal-action flex mt-4">
              {!loading ? (
                <Button
                  className="bg-blue-600 rounded-[5px] mx-6 text-white text-sm px-4 py-1 hover:bg-green-700"
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              ) : (
                <div className=" w-[15%] bg-green-500 px-4  p-2 rounded-md flex justify-center">
                  <span className="loading loading-spinner text-neutral">
                    Update
                  </span>
                </div>
              )}
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
