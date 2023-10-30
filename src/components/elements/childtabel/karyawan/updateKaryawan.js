"use client";
import Button from "@/components/elements/button/button";
import FormComp from "@/components/form/form";
import SelectInput from "@/components/form/select";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiPencilSimpleLineFill } from "react-icons/pi";

export default function UpdateKaryawan(employee) {
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(employee.gambar);
  const [nomorInduk, setNomorInduk] = useState(employee.nomorInduk);
  const [nama, setNama] = useState(employee.nama);
  const [gender, setGender] = useState(employee.gender);
  const [email, setEmail] = useState(employee.email);
  const [telepon, setTelepon] = useState(employee.telepon);
  const [jabatan, setJabatan] = useState(employee.jabatan);
  const [divisi, setDivisi] = useState(employee.divisi);
  const [alamat, setAlamat] = useState(employee.alamat);
  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();

  const onImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleChange = () => {
    setModal(!modal);
  };
  async function handleUpdate(e) {
    e.preventDefault();
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

    const response = await fetch(
      `http://localhost:9000/api/karyawan/${employee.nomorInduk}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          nomorInduk: nomorInduk,
          nama: nama,
          gender: gender,
          email: email,
          telepon: telepon,
          jabatan: jabatan,
          divisi: divisi,
          alamat: alamat,
          gambar: selectedImage,
        }),
      }
    );
    if (response.ok) {
      alert("Data berhasil diupdate");
      router.refresh();
      setModal(false);
    } else {
      alert("Gagal mengupdate data");
    }
  }

  return (
    <div className="">
      <Link href="" className="text-[#10A760]" onClick={handleChange}>
        <PiPencilSimpleLineFill />
      </Link>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box max-w-[45rem] bg-white">
          <h1 className="font-bold text-lg text-black mb-3">
            Update Data Karyawan {employee.nama}
          </h1>
          <div>
            <div className="mb-4 flex flex-row">
              {/* <Upload onChange={(e) => onImageUpload(e)} img={imagePreview} /> */}
              {imagePreview && (
                <Image
                  className="preview"
                  src={selectedImage}
                  alt="preview"
                  width={50}
                  height={50}
                />
              )}
              <input type="file" onChange={(e) => onImageUpload(e)} />
            </div>
            <div className="mb-2">
              <FormComp
                id="nomorInduk"
                type="text"
                value={nomorInduk}
                onChange={(e) => setNomorInduk(e.target.value)}
                placeholder={employee.nomorInduk}
              >
                No Induk
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="nama"
                type="text"
                onChange={(e) => setNama(e.target.value)}
                value={nama}
                placeholder={employee.nama}
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
                value={email}
                placeholder={employee.email}
              >
                Email
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="telepon"
                type="number"
                onChange={(e) => setTelepon(e.target.value)}
                value={telepon}
                placeholder={employee.telepon}
              >
                Telepon
              </FormComp>
            </div>
            <div className="mb-2">
              <SelectInput
                id="jabatan"
                name="jabatan"
                onChange={(e) => setJabatan(e.target.value)}
                label="Jabatan"
                className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
              >
                <option value="">Pilih salah satu</option>
                <option value="manager">Manager</option>
                <option value="crm">CRM</option>
              </SelectInput>
            </div>
            <div className="mb-2">
              <SelectInput
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
              </SelectInput>
            </div>
            <div className="mb-2">
              <FormComp
                id="alamat"
                type="text"
                onChange={(e) => setAlamat(e.target.value)}
                value={alamat}
                placeholder={employee.alamat}
              >
                Alamat
              </FormComp>
            </div>
            <div className=" modal-action flex mt-4">
              <Button
                className="bg-blue-600 rounded-[5px] mx-2 text-white text-sm px-4 py-1 hover:bg-green-700"
                onClick={handleUpdate}
              >
                Update
              </Button>
              <Button
                className=" text-black rounded-[5px] text-sm shadow-lg px-4 py-1 border border-gray-200 hover:bg-gray-500 hover:text-white"
                onClick={handleChange}
              >
                cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
