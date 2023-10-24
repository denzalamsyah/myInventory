"use client";
import Button from "@/components/elements/button/button";
import FormComp from "@/components/form/form";
import SelectInput from "@/components/form/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Upload from "../../uploadImage/upload";
import Link from "next/link";
import { PiPencilSimpleLineFill } from "react-icons/pi";

export default function UpdateInventory(inventory) {
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(inventory.gambar);
  const [nomorInduk, setNomorInduk] = useState("");
  const [nama, setNama] = useState("");
  const [kodeAset, setKodeAset] = useState("");
  const [merk, setMerk] = useState("");
  const [tanggalPembelian, setTanggalPembelian] = useState("");
  const [harga, setHarga] = useState(0);
  const [ruangan, setRuangan] = useState("");
  const [status, setStatus] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [masaManfaat, setMasaManfaat] = useState(0);
  const [nilaiResedu, setNilaiResedu] = useState(0);
  const [tahun1, setTahun1] = useState(0);
  const [tahun2, setTahun2] = useState(0);
  const [tahun3, setTahun3] = useState(0);
  const [tahun4, setTahun4] = useState(0);
  const [depresiasi, setDepresiasi] = useState(0);
  const [idKategori, setIdKategori] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
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
    await fetch(
      "https://functional-zinc-production.up.railway.app/api/karyawan",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomorInduk: nomorInduk,
          nama: nama,
          kodeAset: kodeAset,
          merk: merk,
          tanggalPembelian: tanggalPembelian,
          harga: harga,
          ruangan: ruangan,
          status: status,
          deskripsi: deskripsi,
          masaManfaat: masaManfaat,
          nilaiResedu: nilaiResedu,
          tahun1: tahun1,
          tahun2: tahun2,
          tahun3: tahun3,
          tahun4: tahun4,
          depresiasi: depresiasi,
          idKategori: idKategori,
          gambar: selectedImage,
        }),
      }
    );
    setNomorInduk("");
    setNama("");
    setKodeAset("");
    setMerk("");
    setTanggalPembelian("");
    setHarga(0);
    setRuangan("");
    setStatus("");
    setDeskripsi("");
    setMasaManfaat(0);
    setNilaiResedu(0);
    setTahun1(0);
    setTahun2(0);
    setTahun3(0);
    setTahun4(0);
    setDepresiasi(0);
    setIdKategori("");
    setSelectedImage(null);
    router.refresh();
    setModal(false);
  }
  return (
    <div className="">
      <Link onClick={handleChange} className="text-[#10A760]">
        <PiPencilSimpleLineFill />
      </Link>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box max-w-[60rem] px-11 bg-white">
          <h1 className="font-bold text-lg text-black mb-3">
            Update Data Inventory {inventory.nama}!
          </h1>
          <div>
            <div className="mb-4 flex flex-row">
              <Upload onChange={(e) => onImageUpload(e)} img={imagePreview} />
            </div>
            <div className="flex flex-row gap-[55px]">
              <div>
                <div className="mb-2">
                  <FormComp
                    id="kodeAset"
                    type="text"
                    onChange={(e) => setKodeAset(e.target.value)}
                    placeholder="Masukan Kode Aset"
                  >
                    Kode Aset
                  </FormComp>
                </div>
                <div className="mb-2">
                  <FormComp
                    id="nama"
                    type="text"
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Masukan nama"
                  >
                    Nama
                  </FormComp>
                </div>
                <div className="mb-2">
                  <SelectInput
                    id="merk"
                    name="merk"
                    onChange={(e) => setMerk(e.target.value)}
                    label="Merk"
                    className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
                  >
                    <option value="">Select Merk</option>
                    <option value="laki-laki">A</option>
                    <option value="perempuan">B</option>
                  </SelectInput>
                </div>
                <div className="mb-2">
                  <FormComp
                    id="tanggal"
                    type="date"
                    onChange={(e) => setTanggalPembelian(e.target.value)}
                    placeholder="Masukan tanggal"
                  >
                    Tanggal Pembelian
                  </FormComp>
                </div>
                <div className="mb-2">
                  <FormComp
                    id="harga"
                    type="number"
                    onChange={(e) => setHarga(e.target.value)}
                    placeholder="Masukan harga"
                  >
                    Harga
                  </FormComp>
                </div>
                <div className="mb-2">
                  <SelectInput
                    id="ruangan"
                    name="ruangan"
                    onChange={(e) => setRuangan(e.target.value)}
                    label="Ruangan"
                    className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
                  >
                    <option value="">Select Ruangan</option>
                    <option value="manager">Manager</option>
                    <option value="crm">CRM</option>
                  </SelectInput>
                </div>
                <div className="mb-2">
                  <SelectInput
                    id="status"
                    name="status"
                    onChange={(e) => setStatus(e.target.value)}
                    label="Status"
                    className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
                  >
                    <option value="">Select Status</option>
                    <option value="Marketing">Marketing</option>
                    <option value="FrontEnd">FrontEnd</option>
                    <option value="BackEnd">BackEnd</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Sistem Analis">System Analyst</option>
                  </SelectInput>
                </div>
                <div className="mb-2">
                  <FormComp
                    id="nomorInduk"
                    type="number"
                    onChange={(e) => setNomorInduk(e.target.value)}
                    placeholder="Masukan nomor induk"
                  >
                    Nomor Induk
                  </FormComp>
                </div>
                <div className="mb-2">
                  <FormComp
                    id="deskripsi"
                    type="text"
                    onChange={(e) => setDeskripsi(e.target.value)}
                    placeholder="Masukan deskripsi"
                  >
                    Deskripsi
                  </FormComp>
                </div>
              </div>
              <div>
                <div className="mb-2">
                  <FormComp
                    id="masaManfaat"
                    type="number"
                    onChange={(e) => setMasaManfaat(e.target.value)}
                    placeholder="Masukan masa manfaat"
                  >
                    Masa Manfaat
                  </FormComp>
                </div>
                <div className="mb-2">
                  <FormComp
                    id="nilaiResedu"
                    type="number"
                    onChange={(e) => setNilaiResedu(e.target.value)}
                    placeholder="Masukan nilai resedu"
                  >
                    Nilai Resedu
                  </FormComp>
                </div>
                <div className="mb-2">
                  <FormComp
                    id="tahu1"
                    type="number"
                    onChange={(e) => setTahun1(e.target.value)}
                  >
                    Tahun 1
                  </FormComp>
                </div>
                <div className="mb-2">
                  <FormComp
                    id="tahu2"
                    type="number"
                    onChange={(e) => setTahun2(e.target.value)}
                  >
                    Tahun 2
                  </FormComp>
                </div>
                <div className="mb-2">
                  <FormComp
                    id="tahu3"
                    type="number"
                    onChange={(e) => setTahun3(e.target.value)}
                  >
                    Tahun 3
                  </FormComp>
                </div>
                <div className="mb-2">
                  <FormComp
                    id="tahun4"
                    type="number"
                    onChange={(e) => setTahun4(e.target.value)}
                  >
                    Tahun 4
                  </FormComp>
                </div>
                <div className="mb-2">
                  <FormComp
                    id="depresiasi"
                    type="number"
                    onChange={(e) => setDepresiasi(e.target.value)}
                  >
                    Depresiasi
                  </FormComp>
                </div>
                <div className="mb-2">
                  <FormComp
                    id="idKategori"
                    type="text"
                    onChange={(e) => setIdKategori(e.target.value)}
                    placeholder="Masukan id kategori"
                  >
                    ID Kategori
                  </FormComp>
                </div>
              </div>
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
