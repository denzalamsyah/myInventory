"use client";
import Button from "@/components/elements/button/button";
import FormComp from "@/components/form/form";
import SelectInput from "@/components/form/select";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function TambahInventory() {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
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
  const [imagePreview, setImagePreview] = useState(null);
  const imageInputRef = useRef(null);
  const [idRuangan, setIdRuangan] = useState(0);
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const [roomData, setRoomData] = useState([]);
  const [karyawanData, setKaryawanData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [pembeli, setPembeli] = useState("");
  const onImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };
  function handleChange(e) {
    setModal(!modal);
  }

  const handleSubmit = async (e) => {
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
    formData.append("ruanganId", idRuangan);
    formData.append("pembeli", pembeli);
    try {
      const response = await fetch("http://localhost:9000/api/inventory", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      });

      if (response.ok) {
        setLoading(false);
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
      console.error("Terjadi kesalahan dalam permintaan: " + error.message);
    }
  };

  const fetchSelect = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/ruangan", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        console.log(response);

        const data = await response.json();
        setRoomData(data.data);
      } else {
        throw new Error("Failed to fetch data");
      }

      const resKaryawan = await fetch("http://localhost:9000/api/karyawan", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (resKaryawan.ok) {
        console.log(resKaryawan);

        const data = await resKaryawan.json();
        setKaryawanData(data.data);
      } else {
        throw new Error("Failed to fetch data");
      }

      const resKategori = await fetch("http://localhost:9000/api/kategori", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

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
    <div className="">
      <Button
        className="text-[12px] 2xl:text-lg px-4 rounded-[5px] p-1 hover:text-blue-700 border hover:bg-white border-blue-700 text-white bg-blue-700"
        type="submit"
        onClick={handleChange}
      >
        Add Data Inventory
      </Button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box max-w-[60rem] px-11 bg-white">
          <h1 className="font-bold text-lg text-black mb-3">
            Tambah Data Inventory
          </h1>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            method="POST"
          >
            <div className="mb-4 flex justify-center w-28 h-24 bg-slate-200 rounded-md border-dashed border-2 border-gray-400">
              <div className="relative w-full h-full">
                {imagePreview ? (
                  <div>
                    <Image
                      src={imagePreview}
                      alt="preview"
                      layout="fill"
                      objectFit="cover"
                    />
                    <button
                      className="absolute top-0 text-[8px] right-0 text-black rounded-sm bg-gray-300 p-1"
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
                  <FormComp
                    id="kodeAsset"
                    type="text"
                    onChange={(e) => setKodeAset(e.target.value)}
                    placeholder="Masukan Kode Aset"
                  >
                    Kode Aset
                  </FormComp>
                </div>
                <div className="mb-2">
                  <FormComp
                    id="merk"
                    type="text"
                    onChange={(e) => setMerk(e.target.value)}
                    placeholder="Masukan merk"
                  >
                    Merk
                  </FormComp>
                </div>
                <div className="mb-2">
                  <FormComp
                    id="tanggalPembelian"
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
                    id="KaryawanId"
                    type="number"
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
                <div className="mb-2">
                  <FormComp
                    id="deskripsi"
                    type="text"
                    onChange={(e) => setDeskripsi(e.target.value)}
                    placeholder="Masukkan deskripsi"
                  >
                    Deskripsi
                  </FormComp>
                </div>
              </div>
              <div>
                <div className="mb-2">
                  <FormComp
                    id="vendor"
                    type="text"
                    onChange={(e) => setVendor(e.target.value)}
                    placeholder="Masukan vendor"
                  >
                    Vendor
                  </FormComp>
                </div>
                <div className="mb-2">
                  <FormComp
                    id="pembeli"
                    type="text"
                    onChange={(e) => setPembeli(e.target.value)}
                    placeholder="Masukan nama pembeli"
                  >
                    Pembeli
                  </FormComp>
                </div>
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
                  <SelectInput
                    id="idKategori"
                    type="number"
                    onChange={(e) => setIdKategori(e.target.value)}
                    label="ID Kategori"
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
                <div className="mb-2">
                  <SelectInput
                    id="idRuangan"
                    name="number"
                    onChange={(e) => setIdRuangan(e.target.value)}
                    label="ID Ruangan"
                    className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
                  >
                    <option value="">Pilih Ruangan</option>
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
              </div>
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
