"use client";
import Button from "@/components/elements/button/button";
import FormComp from "@/components/form/form";
import SelectInput from "@/components/form/select";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import Image from "next/image";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function UpdateInventory({
  Id,
  Nama,
  Gambar,
  KodeAsset,
  Merk,
  Vendor,
  TanggalPembelian,
  Harga,
  Status,
  Deskripsi,
  MasaManfaat,
  RuanganId,
  KategoriId,
  KaryawanId,
  Pembeli,
}) {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState(Gambar);
  const [nama, setNama] = useState(Nama);
  const [kodeAset, setKodeAset] = useState(KodeAsset);
  const [merk, setMerk] = useState(Merk);
  const [vendor, setVendor] = useState(Vendor);
  const [tanggalPembelian, setTanggalPembelian] = useState(TanggalPembelian);
  const [harga, setHarga] = useState(Harga);
  // const [status, setStatus] = useState(Status);
  const [deskripsi, setDeskripsi] = useState(Deskripsi);
  const [masaManfaat, setMasaManfaat] = useState(MasaManfaat);
  const [imagePreviews, setImagePreviews] = useState(Gambar);
  const imageInputRefs = useRef(null);
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const [idRuangan, setIdRuangan] = useState(RuanganId);
  const [roomData, setRoomData] = useState([]);
  const [karyawanId, setKaryawanId] = useState(KaryawanId);
  const [karyawanData, setKaryawanData] = useState([]);
  const [idKategori, setIdKategori] = useState(KategoriId);
  const [categoryData, setCategoryData] = useState([]);
  const [pembeli, setPembeli] = useState(Pembeli);
  console.log(karyawanId);
  console.log(idKategori);
  console.log(idRuangan);
  const onImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImages(file);
    setImagePreviews(URL.createObjectURL(file));
  };
  function handleChange() {
    setModal(!modal);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("gambar", selectedImages);
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
    // formData.append("status", status);
    formData.append("ruanganId", idRuangan);
    formData.append("pembeli", pembeli);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/inventory/${Id}`,
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

  const fetchSelect = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/ruangan`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        console.log(response);

        const data = await response.json();
        setRoomData(data.data);
      } else {
        throw new Error("Failed to fetch data");
      }

      const resKaryawan = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/karyawan`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (resKaryawan.ok) {
        console.log(resKaryawan);

        const data = await resKaryawan.json();
        setKaryawanData(data.data);
      } else {
        throw new Error("Failed to fetch data");
      }

      const resKategori = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/kategori`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (resKategori.ok) {
        console.log(resKategori);
        const data = await resKategori.json();
        setCategoryData(data.data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSelect();
  }, []);
  return (
    <>
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
        <div className="modal-box max-w-[60rem] max-h-[40rem] px-11 bg-white">
          <h1 className="font-bold text-lg text-black mb-3">
            Update Data Inventory {Nama}!
          </h1>
          <div>
            <div className="mb-4 flex justify-center w-28 h-24 bg-slate-200 rounded-md border-dashed border-2 border-gray-400">
              <div className="relative w-full h-full">
                {imagePreviews ? (
                  <div>
                    <Image
                      src={imagePreviews}
                      alt="preview"
                      layout="fill"
                      objectFit="cover"
                    />
                    <button
                      className="absolute top-0 text-[10px] right-0 text-black rounded-md p-1"
                      onClick={() => {
                        setImagePreviews(null);
                        document.getElementById("imagesInput").value = ""; // Clear the file input
                      }}
                    >
                      X
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center items-center w-full h-full text-center text-gray-600">
                    <label
                      htmlFor="imagesInput"
                      className="cursor-pointer text-[12px]"
                    >
                      <div className="text-orange-500">*Gambar wajib diisi</div>
                      <div>Click to Choose Image</div>
                    </label>
                  </div>
                )}
              </div>
              <input
                type="file"
                id="imagesInput"
                className="hidden"
                onChange={(e) => onImageUpload(e)}
                ref={imageInputRefs}
              />
            </div>
            <div className="grid lg:grid-cols-2 gap-3">
              <div>
                <div className="mb-2 text-left">
                  <FormComp
                    id="kodeAsset"
                    type="text"
                    value={kodeAset}
                    onChange={(e) => setKodeAset(e.target.value)}
                    placeholder={KodeAsset}
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
                    placeholder={Nama}
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
                    placeholder={Merk}
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
                    placeholder={Vendor}
                  >
                    Vendor
                  </FormComp>
                </div>
                <div className="mb-2 text-left">
                  <FormComp
                    id="tanggalPembelian"
                    type="date"
                    value={tanggalPembelian}
                    onChange={(e) => setTanggalPembelian(e.target.value)}
                    placeholder={TanggalPembelian}
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
                    placeholder={Harga}
                  >
                    Harga
                  </FormComp>
                </div>
                {/* <div className="mb-2 text-left">
                  <SelectInput
                    id="status"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label="Status"
                    className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
                  >
                    <option value="">Select Status</option>
                    <option value="NORMAL">Normal</option>
                    <option value="REPAIR_PROCESS">Repair</option>
                    <option value="DAMAGE">Rusak</option>
                  </SelectInput>
                </div> */}
                <div className="mb-2 text-left">
                  <SelectInput
                    id="idRuangan"
                    type="number"
                    value={idRuangan}
                    onChange={(e) => setIdRuangan(e.target.value)}
                    label="Kode Ruangan"
                    className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
                  >
                    <option value={0}>Pilih Ruangan</option>
                    {roomData.map(
                      (room) => (
                        console.log(room),
                        (
                          <option key={room.id} value={room.id}>
                            {room.kode}
                          </option>
                        )
                      )
                    )}
                  </SelectInput>
                </div>
                <div className="mb-2 text-left">
                  <FormComp
                    id="deskripsi"
                    type="text"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    placeholder={Deskripsi}
                  >
                    Deskripsi
                  </FormComp>
                </div>
              </div>
              <div>
                <div className="mb-2 text-left">
                  <FormComp
                    id="pembeli"
                    type="text"
                    value={pembeli}
                    onChange={(e) => setPembeli(e.target.value)}
                    placeholder={Pembeli}
                  >
                    Pembeli
                  </FormComp>
                </div>
                <div className="mb-2 text-left">
                  <FormComp
                    id="masaManfaat"
                    type="number"
                    value={masaManfaat}
                    onChange={(e) => setMasaManfaat(e.target.value)}
                    placeholder={MasaManfaat}
                  >
                    Masa Manfaat
                  </FormComp>
                </div>

                <div className="mb-2 text-left">
                  <SelectInput
                    id="idKategori"
                    type="number"
                    value={idKategori}
                    onChange={(e) => setIdKategori(e.target.value)}
                    label="Kode Kategori"
                    className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
                  >
                    <option value="">Pilih Kategori</option>
                    {categoryData.map(
                      (category) => (
                        console.log(category),
                        (
                          <option key={category.id} value={category.id}>
                            {category.kode}
                          </option>
                        )
                      )
                    )}
                  </SelectInput>
                </div>
                <div className="mb-2 text-left">
                  <SelectInput
                    id="idKaryawan"
                    value={karyawanId}
                    onChange={(e) => setKaryawanId(e.target.value)}
                    label="Nama Karyawan"
                    className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
                  >
                    <option value="">Pilih Karyawan</option>
                    {karyawanData.map(
                      (karyawan) => (
                        console.log(karyawan),
                        (
                          <option key={karyawan.id} value={karyawan.id}>
                            {karyawan.nama}
                          </option>
                        )
                      )
                    )}
                  </SelectInput>
                </div>
              </div>
            </div>
            <div className=" modal-action flex mt-4">
              {!loading ? (
                <Button
                  className="bg-blue-600 rounded-[5px] mx-6 text-white text-sm px-4 py-1 hover:bg-green-700"
                  onClick={handleSubmit}
                >
                  Update
                </Button>
              ) : (
                <div className=" w-[10%] bg-green-500 px-4 p-2 rounded-md flex justify-center">
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
    </>
  );
}
