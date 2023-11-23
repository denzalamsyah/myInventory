"use client";
import Button from "@/components/elements/button/button";
import FormComp from "@/components/form/form";
import SelectInput from "@/components/form/select";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function TambahKaryawan() {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [nomorInduk, setNomorInduk] = useState("");
  const [nama, setNama] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [divisi, setDivisi] = useState("");
  const [alamat, setAlamat] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const imageInputRef = useRef(null);
  const MySwal = withReactContent(Swal);
  const router = useRouter();

  const onImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleChange = () => {
    setModal(!modal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("nomorInduk", nomorInduk);
    formData.append("nama", nama);
    formData.append("gender", gender);
    formData.append("email", email);
    formData.append("telepon", telepon);
    formData.append("jabatan", jabatan);
    formData.append("divisi", divisi);
    formData.append("alamat", alamat);
    formData.append("gambar", selectedImage);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/karyawan`,
        {
          method: "POST",
          headers: {
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
      console.error("Terjadi kesalahan dalam permintaan: " + error.message);
    }
  };

  return (
    <div className="">
      <button
        className="text-[12px] 2xl:text-[16px] px-4 rounded-[5px] p-1 hover:text-blue-700 border hover:bg-white border-blue-700 text-white bg-blue-700"
        type="submit"
        onClick={handleChange}
      >
        Add Data Karyawan
      </button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box max-w-[45rem] bg-white">
          <h1 className="font-bold text-lg text-black mb-3">
            Tambah Data Karyawan
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
                id="nomorInduk"
                type="text"
                onChange={(e) => setNomorInduk(e.target.value)}
                placeholder="Masukan no induk"
                required
              >
                No Induk
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="nama"
                type="text"
                onChange={(e) => setNama(e.target.value)}
                placeholder="Masukan nama"
                required
              >
                Nama
              </FormComp>
            </div>
            <div className="mb-2">
              <SelectInput
                id="gender"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
                label="Gender"
                className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
              >
                <option value="">Pilih salah satu</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </SelectInput>
            </div>
            <div className="mb-2">
              <FormComp
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukan Email"
                required
              >
                Email
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="telepon"
                type="number"
                onChange={(e) => setTelepon(e.target.value)}
                placeholder="Masukan no telepon"
                required
              >
                Telepon
              </FormComp>
            </div>
            <div className="mb-2">
              {/* <SelectInput
                id="jabatan"
                name="jabatan"
                onChange={(e) => setJabatan(e.target.value)}
                label="Jabatan"
                className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
              >
                <option value="Staff">Pilih salah satu</option>
                <option value="Manager">Manager</option>
                <option value="CRM">CRM</option>
              </SelectInput> */}
              <FormComp
                id="jabatan"
                type="text"
                onChange={(e) => setJabatan(e.target.value)}
                placeholder="Masukan jabatan"
                required
              >
                Jabatan
              </FormComp>
            </div>
            <div className="mb-2">
              {/* <SelectInput
                id="divisi"
                name="divisi"
                onChange={(e) => setDivisi(e.target.value)}
                label="Divisi"
                className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
              >
                <option value="">Pilih salah satu</option>
                <option value="Marketing">Marketing</option>
                <option value="FrontEnd">FrontEnd</option>
                <option value="BackEnd">BackEnd</option>
                <option value="UI/UX">UI/UX</option>
                <option value="Sistem Analis">System Analyst</option>
              </SelectInput> */}
              <FormComp
                id="divisi"
                type="text"
                onChange={(e) => setDivisi(e.target.value)}
                placeholder="Masukan divisi"
                required
              >
                Divisi
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="alamat"
                type="text"
                onChange={(e) => setAlamat(e.target.value)}
                placeholder="Masukan alamat"
                required
              >
                Alamat
              </FormComp>
            </div>
            <div className=" modal-action flex mt-4">
              {!loading ? (
                <Button
                  className="bg-blue-600 rounded-[5px] mx-2 text-white text-sm px-4 py-1 hover:bg-green-700"
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
