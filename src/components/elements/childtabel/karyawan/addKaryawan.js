// "use client";
// import Button from "@/components/elements/button/button";
// import FormComp from "@/components/form/form";
// import SelectInput from "@/components/form/select";
// import { useState } from "react";
// import Upload from "../../uploadImage/upload";
// import { useRouter } from "next/navigation";
// export default function TambahKaryawan() {
//   const [modal, setModal] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [nomorInduk, setNomorInduk] = useState("");
//   const [nama, setNama] = useState("");
//   const [gender, setGender] = useState("");
//   const [email, setEmail] = useState("");
//   const [telepon, setTelepon] = useState("");
//   const [jabatan, setJabatan] = useState("");
//   const [divisi, setDivisi] = useState("");
//   const [alamat, setAlamat] = useState("");
//   const [imagePreview, setImagePreview] = useState(null);
//   const router = useRouter();
//   const onImageUpload = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//     setImagePreview(URL.createObjectURL(file));
//   };
//   function handleChange() {
//     setModal(!modal);
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("nomorInduk", nomorInduk);
//     formData.append("nama", nama);
//     formData.append("gender", gender);
//     formData.append("email", email);
//     formData.append("telepon", telepon);
//     formData.append("jabatan", jabatan);
//     formData.append("divisi", divisi);
//     formData.append("alamat", alamat);
//     formData.append("gambar", selectedImage);

//     try {
//       const response = await fetch("http://localhost:9000/api/karyawan", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + localStorage.getItem("token"),
//         },
//         body: formData,
//       });

//       if (response.ok) {
//         console.log("Data berhasil ditambahkan");
//         setNomorInduk("");
//         setNama("");
//         setGender("");
//         setJabatan("");
//         setDivisi("");
//         setEmail("");
//         setTelepon("");
//         setAlamat("");
//         setSelectedImage(null);
//         router.refresh();
//         setModal(false);
//       } else {
//         // Gagal menambahkan data
//         console.error("Gagal menambahkan data");
//       }
//     } catch (error) {
//       // Kesalahan dalam permintaan
//       console.error("Terjadi kesalahan dalam permintaan: " + error.message);
//     }
//   }

//   return (
//     <div className="">
//       <Button
//         className="text-[12px] 2xl:text-lg px-4 rounded-[5px] p-1 hover:text-blue-700 border hover:bg-white border-blue-700 text-white bg-blue-700"
//         type="submit"
//         onClick={handleChange}
//       >
//         Add Data Karyawan
//       </Button>
//       <input
//         type="checkbox"
//         checked={modal}
//         onChange={handleChange}
//         className="modal-toggle"
//       />
//       <div className="modal">
//         <div className="modal-box max-w-[45rem] bg-white">
//           <h1 className="font-bold text-lg text-black mb-3">
//             Tambah Data Karyawan
//           </h1>
//           <form
//             onSubmit={handleSubmit}
//             encType="multipart/form-data"
//             method="POST"
//           >
//             <div className="mb-4 flex flex-row">
//               <Upload onChange={(e) => onImageUpload(e)} img={imagePreview} />
//               {/* <input type="file" onChange={(e) => onImageUpload(e)} /> */}
//             </div>
//             <div className="mb-2">
//               <FormComp
//                 id="nomorInduk"
//                 type="text"
//                 onChange={(e) => setNomorInduk(e.target.value)}
//                 placeholder="Masukan no induk"
//               >
//                 No Induk
//               </FormComp>
//             </div>
//             <div className="mb-2">
//               <FormComp
//                 id="nama"
//                 type="text"
//                 onChange={(e) => setNama(e.target.value)}
//                 placeholder="Masukan nama"
//               >
//                 Nama
//               </FormComp>
//             </div>
//             <div className="mb-2">
//               <SelectInput
//                 id="gender"
//                 name="gender"
//                 onChange={(e) => setGender(e.target.value)}
//                 label="Gender"
//                 className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
//               >
//                 <option value="">Pilih salah satu</option>
//                 <option value="MALE">Male</option>
//                 <option value="FEMALE">Female</option>
//               </SelectInput>
//             </div>
//             <div className="mb-2">
//               <FormComp
//                 id="email"
//                 type="email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Masukan Email"
//               >
//                 Email
//               </FormComp>
//             </div>
//             <div className="mb-2">
//               <FormComp
//                 id="telepon"
//                 type="number"
//                 onChange={(e) => setTelepon(e.target.value)}
//                 placeholder="Masukan no telepon"
//               >
//                 Telepon
//               </FormComp>
//             </div>
//             <div className="mb-2">
//               <SelectInput
//                 id="jabatan"
//                 name="jabatan"
//                 onChange={(e) => setJabatan(e.target.value)}
//                 label="Jabatan"
//                 className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
//               >
//                 <option value="">Pilih salah satu</option>
//                 <option value="manager">Manager</option>
//                 <option value="crm">CRM</option>
//               </SelectInput>
//             </div>
//             <div className="mb-2">
//               <SelectInput
//                 id="divisi"
//                 name="divisi"
//                 onChange={(e) => setDivisi(e.target.value)}
//                 label="Divisi"
//                 className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
//               >
//                 <option value="">Pilih salah satu</option>
//                 <option value="Marketing">Marketing</option>
//                 <option value="FrontEnd">FrontEnd</option>
//                 <option value="BackEnd">BackEnd</option>
//                 <option value="UI/UX">UI/UX</option>
//                 <option value="Sistem Analis">System Analyst</option>
//               </SelectInput>
//             </div>
//             <div className="mb-2">
//               <FormComp
//                 id="alamat"
//                 type="text"
//                 onChange={(e) => setAlamat(e.target.value)}
//                 placeholder="Masukan alamat"
//               >
//                 Alamat
//               </FormComp>
//             </div>
//             <div className=" modal-action flex mt-4">
//               <Button
//                 className="bg-blue-600 rounded-[5px] mx-2 text-white text-sm px-4 py-1 hover:bg-green-700"
//                 // onClick={handleSubmit}
//                 type="submit"
//               >
//                 Add
//               </Button>
//               <Button
//                 className=" text-black rounded-[5px] text-sm shadow-lg px-4 py-1 border border-gray-200 hover:bg-gray-500 hover:text-white"
//                 type="submit"
//               >
//                 cancel
//               </Button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import Button from "@/components/elements/button/button";
import FormComp from "@/components/form/form";
import SelectInput from "@/components/form/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Upload from "../../uploadImage/upload";
import Image from "next/image";

export default function TambahKaryawan() {
  const [modal, setModal] = useState(false);
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
      const response = await fetch("http://localhost:9000/api/karyawan", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Data berhasil ditambahkan");
        setNomorInduk("");
        setNama("");
        setGender("");
        setJabatan("");
        setDivisi("");
        setEmail("");
        setTelepon("");
        setAlamat("");
        setSelectedImage(null);
        router.refresh(); // Reload halaman atau lakukan navigasi sesuai kebutuhan
        setModal(false);
      } else {
        console.error("Gagal menambahkan data");
      }
    } catch (error) {
      console.error("Terjadi kesalahan dalam permintaan: " + error.message);
    }
  };

  return (
    <div className="">
      <button
        className="text-[12px] 2xl:text-lg px-4 rounded-[5px] p-1 hover:text-blue-700 border hover:bg-white border-blue-700 text-white bg-blue-700"
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
            <div className="mb-4 flex flex-row">
              {/* <Upload onChange={(e) => onImageUpload(e)} img={imagePreview} /> */}
              {imagePreview && (
                <Image
                  className="preview"
                  src={imagePreview}
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
                onChange={(e) => setNomorInduk(e.target.value)}
                placeholder="Masukan no induk"
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
                placeholder="Masukan alamat"
              >
                Alamat
              </FormComp>
            </div>
            <div className=" modal-action flex mt-4">
              <Button
                className="bg-blue-600 rounded-[5px] mx-2 text-white text-sm px-4 py-1 hover:bg-green-700"
                type="submit"
              >
                Add
              </Button>
              <Button
                className=" text-black rounded-[5px] text-sm shadow-lg px-4 py-1 border border-gray-200 hover:bg-gray-500 hover:text-white"
                onClick={handleChange}
              >
                cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
