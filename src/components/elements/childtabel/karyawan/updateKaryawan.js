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
  const [nomorInduk, setNomorInduk] = useState(employee.noInduk);
  const [nama, setNama] = useState(employee.nama);
  const [gender, setGender] = useState(employee.gender);
  const [email, setEmail] = useState(employee.email);
  const [telepon, setTelepon] = useState(employee.telepon);
  const [jabatan, setJabatan] = useState(employee.jabatan);
  const [divisi, setDivisi] = useState(employee.divisi);
  const [alamat, setAlamat] = useState(employee.alamat);
  const router = useRouter();
  function handleChange() {
    setModal(!modal);
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };
  async function handleUpdate(e) {
    e.preventDefault();
    await fetch(`http://localhost:5000/employee/${employee.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
    });

    router.refresh();
    setModal(false);
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
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm"
                placeholder={employee.gambar}
              />
              {/* Gambar yang ditampilkan ketika diunggah */}
              {selectedImage && (
                <Image
                  src=""
                  alt="Selected Image"
                  className="w-[50px] h-[50px]"
                  width={25}
                  height={25}
                />
              )}
            </div>
            <div className="mb-2">
              <FormComp
                id="nomorInduk"
                type="text"
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
                placeholder={employee.gender}
                className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
              >
                <option value="-">Pilih salah satu</option>
                <option value="laki-laki">Laki-laki</option>
                <option value="perempuan">Perempuan</option>
              </SelectInput>
            </div>
            <div className="mb-2">
              <FormComp
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder={employee.jabatan}
                className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
              >
                <option value="-">Pilih salah satu</option>
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
                placeholder={employee.divisi}
                className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
              >
                <option value="-">Pilih salah satu</option>
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
