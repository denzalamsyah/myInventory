"use client";
import Button from "@/components/elements/button/button";
import FormComp from "@/components/form/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Image from "next/image";

export default function UpdateRoom(room) {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [kodeRuangan, setKodeRuangan] = useState(room.kode);
  const [namaRuangan, setNamaRuangan] = useState(room.nama);
  const [lokasiRuangan, setLokasiRuangan] = useState(room.lokasi);
  const [lantai, setLantai] = useState(room.lantai);
  const [selectedImages, setSelectedImages] = useState(room.gambar);
  const [imagePreviews, setImagePreviews] = useState(room.gambar);
  const imageInputRefs = useRef(null);
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  console.log(namaRuangan);
  console.log(selectedImages);
  const onImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImages(file);
    setImagePreviews(URL.createObjectURL(file));
  };

  function handleChange() {
    setModal(!modal);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("kode", kodeRuangan);
    formData.append("nama", namaRuangan);
    formData.append("lokasi", lokasiRuangan);
    formData.append("lantai", lantai);
    formData.append("gambar", selectedImages);

    const response = await fetch(
      `http://localhost:9000/api/ruangan/${room.id}`,
      {
        method: "PUT",
        headers: {
          // "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      }
    );
    console.log(response);
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
            Edit Ruangan {room.nama}
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
                        document.getElementById("imagesInput").value = "";
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
            <div className="mb-2">
              <FormComp
                id="kodeRuangan"
                type="text"
                onChange={(e) => setKodeRuangan(e.target.value)}
                placeholder={room.kode}
                value={kodeRuangan}
              >
                Kode Ruangan
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="namaRuangan"
                type="text"
                onChange={(e) => setNamaRuangan(e.target.value)}
                placeholder={room.nama}
                value={namaRuangan}
              >
                Nama Ruangan
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="lantaiRuangan"
                type="text"
                onChange={(e) => setLantai(e.target.value)}
                placeholder={room.lantai}
                value={lantai}
                required
              >
                Lokasi Ruangan
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="lokasiRuangan"
                type="text"
                onChange={(e) => setLokasiRuangan(e.target.value)}
                placeholder={room.lokasi}
                value={lokasiRuangan}
                required
              >
                Lokasi Ruangan
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
                <div className=" w-[15%] bg-green-500  p-2 rounded-md flex justify-center">
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
