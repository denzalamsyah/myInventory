"use client";
import Button from "@/components/elements/button/button";
import FormComp from "@/components/form/form";
import SelectInput from "@/components/form/select";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Link from "next/link";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import Image from "next/image";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function UpdateInventory(inventory) {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(inventory.gambar);
  const [karyawanId, setKaryawanId] = useState(inventory.karyawanId);
  const [nama, setNama] = useState(inventory.nama);
  const [kodeAset, setKodeAset] = useState(inventory.kodeAsset);
  const [merk, setMerk] = useState(inventory.merk);
  const [vendor, setVendor] = useState(inventory.vendor);
  const [tanggalPembelian, setTanggalPembelian] = useState(
    inventory.tanggalPembelian
  );
  const [harga, setHarga] = useState(inventory.harga);
  const [status, setStatus] = useState(inventory.status);
  const [deskripsi, setDeskripsi] = useState(inventory.deskripsi);
  const [masaManfaat, setMasaManfaat] = useState(inventory.masaManfaat);

  const [idKategori, setIdKategori] = useState(inventory.kategoriId);
  const [imagePreview, setImagePreview] = useState(null);
  const imageInputRef = useRef(null);
  const [idRuangan, setIdRuangan] = useState(inventory.ruanganId);
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const onImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };
  function handleChange() {
    setModal(!modal);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("gambar", selectedImage);
    formData.append("kodeAsset", kodeAset);
    formData.append("nama", nama);
    formData.append("merk", merk);
    formData.append("masaManfaat", masaManfaat);
    formData.append("tanggalPembelian", tanggalPembelian);
    formData.append("harga", harga);
    formData.append("vendor", vendor);
    formData.append("deskripsi", deskripsi);
    formData.append("kategoriId", idKategori);
    formData.append("karyawanId", karyawanId);
    formData.append("status", status);
    formData.append("ruanganId", idRuangan);

    const response = await fetch(
      `http://localhost:9000/api/inventory/${inventory.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      }
    );
    setLoading(false);
    if (response.ok) {
      setModal(false);
      MySwal.fire("Updated!", "Klik tombol!", "success").then(() => {
        router.refresh();
      });
    } else {
      MySwal.fire("Gagal mengubah data", "Klik tombol!", "error");
    }
  }
  return (
    <>
      <Link href="" onClick={handleChange} className="text-[#10A760]">
        <PiPencilSimpleLineFill />
      </Link>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box max-w-[60rem] max-h-[40rem] px-11 bg-white">
          <h1 className="font-bold text-lg text-black mb-3">
            Update Data Inventory {inventory.nama}!
          </h1>
          <div>
            <div className="mb-4 flex justify-center w-28 h-24 bg-slate-200 rounded-md border-dashed border-2 border-gray-400">
              <div className="relative w-full h-full">
                {selectedImage ? (
                  <div>
                    <Image
                      src={selectedImage}
                      alt="preview"
                      layout="fill"
                      objectFit="cover"
                    />
                    <button
                      className="absolute top-0 text-[10px] right-0 text-black rounded-md p-1"
                      onClick={() => {
                        setImagePreview(null);
                        document.getElementById("imageInput").value = ""; // Clear the file input
                      }}
                    >
                      X
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center items-center w-full h-full text-center text-gray-600">
                    <label
                      htmlFor="imageInput"
                      className="cursor-pointer text-[12px]"
                    >
                      <div>Drag & Drop or</div>
                      <div>Click to Choose Image</div>
                    </label>
                  </div>
                )}
              </div>
              <input
                type="file"
                id="imageInput"
                className="hidden"
                onChange={(e) => onImageUpload(e)}
                ref={imageInputRef}
              />
            </div>
            <div className="flex flex-row gap-[55px]">
              <div>
                <div className="mb-2 text-left">
                  <FormComp
                    id="kodeAset"
                    type="text"
                    value={kodeAset}
                    onChange={(e) => setKodeAset(e.target.value)}
                    placeholder={inventory.kodeAsset}
                  >
                    Kode Aset
                  </FormComp>
                </div>
                <div className="mb-2 text-left">
                  <FormComp
                    id="nama"
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder={inventory.nama}
                  >
                    Nama
                  </FormComp>
                </div>
                <div className="mb-2 text-left">
                  <FormComp
                    id="merk"
                    type="text"
                    value={merk}
                    onChange={(e) => setMerk(e.target.value)}
                    placeholder={inventory.merk}
                  >
                    Merk
                  </FormComp>
                </div>
                <div className="mb-2 text-left">
                  <FormComp
                    id="vendor"
                    type="text"
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                    placeholder={inventory.vendor}
                  >
                    Vendor
                  </FormComp>
                </div>
                <div className="mb-2 text-left">
                  <FormComp
                    id="tanggal"
                    type="date"
                    value={tanggalPembelian}
                    onChange={(e) => setTanggalPembelian(e.target.value)}
                    placeholder={inventory.tanggalPembelian}
                  >
                    Tanggal Pembelian
                  </FormComp>
                </div>
                <div className="mb-2 text-left">
                  <FormComp
                    id="harga"
                    type="number"
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                    placeholder={inventory.harga}
                  >
                    Harga
                  </FormComp>
                </div>
                <div className="mb-2 text-left">
                  <SelectInput
                    id="status"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label="Status"
                    className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
                  >
                    <option value="">Select Status</option>
                    <option value="Normal">Normal</option>
                    <option value="Repair">Repair</option>
                    <option value="Rusak">Rusak</option>
                  </SelectInput>
                </div>
                <div className="mb-2 text-left">
                  <FormComp
                    id="idRuangan"
                    type="number"
                    value={idRuangan}
                    onChange={(e) => setIdRuangan(e.target.value)}
                    placeholder={inventory.ruanganId}
                  >
                    Ruangan
                  </FormComp>
                </div>
                <div className="mb-2 text-left">
                  <FormComp
                    id="deskripsi"
                    type="text"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    placeholder={inventory.deskripsi}
                  >
                    Deskripsi
                  </FormComp>
                </div>
              </div>
              <div>
                <div className="mb-2 text-left">
                  <FormComp
                    id="masaManfaat"
                    type="number"
                    value={masaManfaat}
                    onChange={(e) => setMasaManfaat(e.target.value)}
                    placeholder={inventory.masaManfaat}
                  >
                    Masa Manfaat
                  </FormComp>
                </div>

                <div className="mb-2 text-left">
                  <FormComp
                    id="idKategori"
                    type="number"
                    value={idKategori}
                    onChange={(e) => setIdKategori(e.target.value)}
                    placeholder={inventory.idKategori}
                  >
                    Kategori
                  </FormComp>
                </div>
                <div className="mb-2 text-left">
                  <FormComp
                    id="idKaryawan"
                    type="number"
                    value={karyawanId}
                    onChange={(e) => setKaryawanId(e.target.value)}
                    placeholder={inventory.idKaryawan}
                  >
                    Karyawan
                  </FormComp>
                </div>
              </div>
            </div>
            <div className=" modal-action flex mt-4">
              {!loading ? (
                <Button
                  className="bg-blue-600 rounded-[5px] mx-6 text-white text-sm px-4 py-1 hover:bg-green-700"
                  onClick={handleSubmit}
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
          </div>
        </div>
      </div>
    </>
  );
}
