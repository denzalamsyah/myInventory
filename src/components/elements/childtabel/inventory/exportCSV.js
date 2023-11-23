"use client";
import Button from "@/components/elements/button/button";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";

export default function ExportCSVInventory() {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [exportCSV, setExportCSV] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [karyawanId, setKaryawanId] = useState(0);
  const [nama, setNama] = useState("");
  const [kodeAset, setKodeAset] = useState("");
  const [merk, setMerk] = useState("");
  const [vendor, setVendor] = useState("");
  const [tanggalPembelian, setTanggalPembelian] = useState(null);
  const [harga, setHarga] = useState(0);
  const [deskripsi, setDeskripsi] = useState("");
  const [masaManfaat, setMasaManfaat] = useState(0);
  const [idKategori, setIdKategori] = useState(0);
  const [idRuangan, setIdRuangan] = useState(0);
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const [pembeli, setPembeli] = useState("");

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
    formData.append("nama", nama);
    formData.append("merk", merk);
    formData.append("masaManfaat", masaManfaat);
    formData.append("tanggalPembelian", tanggalPembelian);
    formData.append("harga", harga);
    formData.append("vendor", vendor);
    formData.append("deskripsi", deskripsi);
    formData.append("pembeli", pembeli);
    formData.append("kategoriId", idKategori);
    formData.append("gambar", selectedImage);
    formData.append("karyawanId", karyawanId);
    formData.append("ruanganId", idRuangan);
    formData.append("kodeAsset", kodeAset);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/inventory/upload`,
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
      console.log(response);
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
          <h1 className="font-bold text-[12px] 2xl:text-[16px] text-black mb-3">
            Export CSV Inventory
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
