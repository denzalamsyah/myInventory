"use client";
import Button from "@/components/elements/button/button";
import FormComp from "@/components/form/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function TambahKategori() {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [kodeKategori, setKodeKategori] = useState("");
  const [namakategori, setNamaKategori] = useState("");
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  function handleChange() {
    setModal(!modal);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("http://localhost:9000/api/kategori", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        nama: namakategori,
        kode: kodeKategori,
      }),
    });
    setLoading(false);
    if (response.ok) {
      setModal(false);
      MySwal.fire("Berhasil menambahkan!", "Klik tombol!", "success").then(
        () => {
          router.refresh();
        }
      );
    } else {
      MySwal.fire("Gagal menambahkan", "Klik tombol!", "error");
    }
  }
  return (
    <div className="">
      <Button
        className="text-[12px] 2xl:text-[16px] px-4 rounded-[5px] p-1 hover:text-blue-700 border hover:bg-white border-blue-700 text-white bg-blue-700"
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
          <form onSubmit={handleSubmit} method="POST">
            <div className="mb-2">
              <FormComp
                id="kodeKategori"
                type="text"
                onChange={(e) => setKodeKategori(e.target.value)}
                placeholder="Masukan kode kategori"
              >
                Kode Kategori
              </FormComp>
            </div>
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
              {!loading ? (
                <Button
                  className="bg-blue-600 rounded-[5px] mx-6 text-white text-sm px-4 py-1 hover:bg-green-700"
                  type="submit"
                >
                  Add
                </Button>
              ) : (
                <div className=" w-[10%] bg-green-500  p-2 rounded-md flex justify-center">
                  <span className="loading loading-spinner text-neutral"></span>
                </div>
              )}
              <Button
                className=" text-black rounded-[5px] text-sm shadow-lg px-4 py-1 border border-gray-200 hover:bg-gray-500 hover:text-white"
                onClick={handleChange}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
