// "use client";
// import Button from "@/components/elements/button/button";
// import FormComp from "@/components/form/form";
// import SelectInput from "@/components/form/select";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState, useRef } from "react";
// import { PiPencilSimpleLineFill } from "react-icons/pi";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

// export default function UpdateKaryawan(employee) {
//   const [modal, setModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(employee.gambar);
//   const [nomorInduk, setNomorInduk] = useState(employee.nomorInduk);
//   const [nama, setNama] = useState(employee.nama);
//   const [gender, setGender] = useState(employee.gender);
//   const [email, setEmail] = useState(employee.email);
//   const [telepon, setTelepon] = useState(employee.telepon);
//   const [jabatan, setJabatan] = useState(employee.jabatan);
//   const [divisi, setDivisi] = useState(employee.divisi);
//   const [alamat, setAlamat] = useState(employee.alamat);
//   const [imagePreview, setImagePreview] = useState(null);
//   const imageInputRef = useRef(null);
//   const router = useRouter();
//   const MySwal = withReactContent(Swal);
//   const onImageUpload = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//     setImagePreview(URL.createObjectURL(file));
//   };

//   const handleChange = () => {
//     setModal(!modal);
//   };
//   async function handleUpdate(e) {
//     e.preventDefault();
//     setLoading(true);
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

//     const response = await fetch(
//       `http://localhost:9000/api/karyawan/${employee.id}`,
//       {
//         method: "PUT",
//         headers: {
//           //   // "Content-Type": "application/json",
//           Authorization: "Bearer " + localStorage.getItem("token"),
//         },
//         body: formData,
//       }
//     );
//     setLoading(false);
//     if (response.ok) {
//       setModal(false);
//       MySwal.fire("Updated!", "Klik tombol!", "success").then(() => {
//         router.refresh();
//       });
//     } else {
//       MySwal.fire("Gagal mengubah data", "Klik tombol!", "error");
//     }
//   }

//   return (
//     <>
//       <Link href="" className="text-[#10A760]" onClick={handleChange}>
//         <PiPencilSimpleLineFill />
//       </Link>
//       <input
//         type="checkbox"
//         checked={modal}
//         onChange={handleChange}
//         className="modal-toggle"
//       />
//       <div className="modal">
//         <div className="modal-box max-w-[45rem] bg-white">
//           <h1 className="font-bold text-lg text-black mb-3">
//             Update Data Karyawan {employee.nama}
//           </h1>
//           <div>
//             <div className="mb-4 flex justify-center w-28 h-24 bg-slate-200 rounded-md border-dashed border-2 border-gray-400">
//               <div className="relative w-full h-full">
//                 {selectedImage ? (
//                   <div>
//                     <Image
//                       src={selectedImage}
//                       alt="preview"
//                       layout="fill"
//                       objectFit="cover"
//                     />
//                     <button
//                       className="absolute top-0 text-[10px] right-0 text-black rounded-md p-1"
//                       onClick={() => {
//                         setImagePreview(null);
//                         document.getElementById("imageInput").value = ""; // Clear the file input
//                       }}
//                     >
//                       X
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="flex justify-center items-center w-full h-full text-center text-gray-600">
//                     <label
//                       htmlFor="imageInput"
//                       className="cursor-pointer text-[12px]"
//                     >
//                       <div className="text-orange-500">*Gambar wajib diisi</div>
//                       <div>Click to Choose Image</div>
//                     </label>
//                   </div>
//                 )}
//               </div>
//               <input
//                 type="file"
//                 id="imageInput"
//                 className="hidden"
//                 onChange={(e) => onImageUpload(e)}
//                 ref={imageInputRef}
//               />
//             </div>
//             <div className="mb-2">
//               <FormComp
//                 id="nomorInduk"
//                 type="text"
//                 value={nomorInduk}
//                 onChange={(e) => setNomorInduk(e.target.value)}
//                 placeholder={employee.nomorInduk}
//               >
//                 No Induk
//               </FormComp>
//             </div>
//             <div className="mb-2">
//               <FormComp
//                 id="nama"
//                 type="text"
//                 onChange={(e) => setNama(e.target.value)}
//                 value={nama}
//                 placeholder={employee.nama}
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
//                 value={email}
//                 placeholder={employee.email}
//               >
//                 Email
//               </FormComp>
//             </div>
//             <div className="mb-2">
//               <FormComp
//                 id="telepon"
//                 type="number"
//                 onChange={(e) => setTelepon(e.target.value)}
//                 value={telepon}
//                 placeholder={employee.telepon}
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
//                 <option value="Manager">Manager</option>
//                 <option value="CRM">CRM</option>
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
//                 value={alamat}
//                 placeholder={employee.alamat}
//               >
//                 Alamat
//               </FormComp>
//             </div>
//             <div className=" modal-action flex mt-4">
//               {!loading ? (
//                 <Button
//                   className="bg-blue-600 rounded-[5px] mx-2 text-white text-sm px-4 py-1 hover:bg-green-700"
//                   onClick={handleUpdate}
//                 >
//                   Update
//                 </Button>
//               ) : (
//                 <div className=" w-[10%] bg-green-500  px-4 p-2 rounded-md flex justify-center">
//                   <span className="loading loading-spinner text-neutral">
//                     Update
//                   </span>
//                 </div>
//               )}
//               <Button
//                 className=" text-black rounded-[5px] text-sm shadow-lg px-4 py-1 border border-gray-200 hover:bg-gray-500 hover:text-white"
//                 onClick={handleChange}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";
import Button from "@/components/elements/button/button";
import FormComp from "@/components/form/form";
import SelectInput from "@/components/form/select";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function UpdateKaryawan(employee) {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [nomorInduk, setNomorInduk] = useState(employee.nomorInduk);
  const [nama, setNama] = useState(employee.nama);
  const [gender, setGender] = useState(employee.gender);
  const [email, setEmail] = useState(employee.email);
  const [telepon, setTelepon] = useState(employee.telepon);
  const [jabatan, setJabatan] = useState(employee.jabatan);
  const [divisi, setDivisi] = useState(employee.divisi);
  const [alamat, setAlamat] = useState(employee.alamat);
  const [imagePreview, setImagePreview] = useState(null);
  const imageInputRef = useRef(null);
  const router = useRouter();
  const MySwal = withReactContent(Swal);
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

    const response = await fetch(
      `http://localhost:9000/api/karyawan/${employee.id}`,
      {
        method: "PUT",
        headers: {
          //   // "Content-Type": "application/json",
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
                <option value="Manager">Manager</option>
                <option value="CRM">CRM</option>
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
              {!loading ? (
                <Button
                  className="bg-blue-600 rounded-[5px] mx-2 text-white text-sm px-4 py-1 hover:bg-green-700"
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              ) : (
                <div className=" w-[10%] bg-green-500  px-4 p-2 rounded-md flex justify-center">
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
