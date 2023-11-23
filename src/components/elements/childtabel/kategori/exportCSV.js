"use client";
import Button from "@/components/elements/button/button";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";

export default function ExportCSVKategori() {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [exportCSV, setExportCSV] = useState(null);
  const [namakategori, setNamakategori] = useState("");
  const [kodeKategori, setKodeKategori] = useState("");
  const router = useRouter();
  const MySwal = withReactContent(Swal);

  function handleChange() {
    setModal(!modal);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (!exportCSV) {
      setLoading(false);
      MySwal.fire("Pilih file CSV terlebih dahulu!", "Klik tombol!", "error");
      return;
    }

    const formData = new FormData();
    formData.append("file", exportCSV);
    formData.append("nama", namakategori);
    formData.append("kode", kodeKategori);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/kategori/upload`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: formData,
        }
      );

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
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      MySwal.fire("Terjadi kesalahan", "Klik tombol!", "error");
    }
  }

  return (
    <div className="">
      <Button
        className="text-[12px] 2xl:text-[16px] px-4 rounded-[5px] p-1 text-blue-700 border bg-white border-blue-700 hover:text-white hover:bg-blue-700"
        type="submit"
        onClick={handleChange}
      >
        Export CSV
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
            Export CSV Kategori
          </h1>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            method="POST"
          >
            <div className="mb-2">
              <input
                type="file"
                onChange={(e) => setExportCSV(e.target.files[0])}
              />
            </div>
            <div className="modal-action flex mt-4">
              {!loading ? (
                <Button
                  className="bg-blue-600 rounded-[5px] mx-6 text-white text-sm px-4 py-1 hover:bg-green-700"
                  type="submit"
                >
                  Add
                </Button>
              ) : (
                <div className=" w-[10%] bg-green-500 px-4 p-2 rounded-md flex justify-center">
                  <span className="loading loading-spinner text-neutral">
                    Add
                  </span>
                </div>
              )}
              <Button
                className="text-black rounded-[5px] text-sm shadow-lg px-4 py-1 border border-gray-200 hover:bg-gray-500 hover:text-white"
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
