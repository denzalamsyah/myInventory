"use client";
import Button from "@/components/elements/button/button";
import FormComp from "@/components/form/form";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Image from "next/image";
import SelectInput from "@/components/form/select";

export default function TambahRoom() {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [kodeRuangan, setKodeRuangan] = useState("");
  const [namaRuangan, setNamaRuangan] = useState("");
  const [lantai, setLantai] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const imageInputRef = useRef(null);
  const router = useRouter();
  const MySwal = withReactContent(Swal);

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
    formData.append("kode", kodeRuangan);
    formData.append("nama", namaRuangan);
    formData.append("lantai", lantai);
    formData.append("lokasi", lokasi);
    formData.append("gambar", selectedImage);

    const response = await fetch("http://localhost:9000/api/ruangan", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData,
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
        Add Ruangan
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
            Tambah Data Ruangan
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
                      <div className="text-orange-500">*Gambar wajib diisi</div>
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
            <div className="mb-2">
              <FormComp
                id="kodeRuangan"
                type="text"
                onChange={(e) => setKodeRuangan(e.target.value)}
                placeholder="Masukan kode Ruangan"
                required
              >
                Kode Ruangan
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="namaRuangan"
                type="text"
                onChange={(e) => setNamaRuangan(e.target.value)}
                placeholder="Masukan nama Ruangan"
                required
              >
                Nama Ruangan
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="namaLantai"
                type="text"
                onChange={(e) => setLantai(e.target.value)}
                placeholder="Masukan nama lantai"
                required
              >
                Nama Lantai
              </FormComp>
            </div>
            <div className="mb-2">
              {/* <FormComp
                id="lokasi"
                type="text"
                onChange={(e) => setLokasi(e.target.value)}
                placeholder="Masukan lokasi"
                required
              >
                Lokasi
              </FormComp> */}
              <SelectInput
                id="lokasi"
                name="lokasi"
                onChange={(e) => setLokasi(e.target.value)}
                label="Lokasi"
                className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
              >
                <option value="">Pilih salah satu</option>
                <option value="Bandung">Bandung</option>
                <option value="Surabaya">Surabaya</option>
                <option value="Depok">Depok</option>
              </SelectInput>
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
                <div className=" w-[15%] bg-green-500  p-2 rounded-md flex justify-center">
                  <span className="loading loading-spinner text-neutral">
                    Add
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
          </form>
        </div>
      </div>
    </div>
  );
}
