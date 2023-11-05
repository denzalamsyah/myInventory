"use client";
import Button from "@/components/elements/button/button";
import FormComp from "@/components/form/form";
import SelectInput from "@/components/form/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function TambahPerbaikan() {
  const [modal, setModal] = useState(false);
  const [repairData, setRepairData] = useState([]);
  const [inventory, setInventory] = useState(0);
  const [tanggalKerusakan, setTanggalKerusakan] = useState(null);
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggalPerbaikan, setTanggalPerbaikan] = useState(null);
  const [biaya, setBiaya] = useState(0);
  const [tanggalSelesaiPerbaikan, setTanggalSelesaiPerbaikan] = useState(null);
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  function handleChange() {
    setModal(!modal);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:9000/api/perbaikan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        inventoryId: inventory,
        tanggalKerusakan: tanggalKerusakan,
        deskripsi: deskripsi,
        tanggalPerbaikan: tanggalPerbaikan,
        biaya: biaya,
        tanggalSelesaiPerbaikan: tanggalSelesaiPerbaikan,
      }),
    });
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

  const fetchRepair = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/inventory", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      console.log(response);

      const data = await response.json();
      setRepairData(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchRepair();
  }, []);

  return (
    <div className="">
      <Button
        className="text-[12px] 2xl:text-lg px-4 rounded-[5px] p-1 hover:text-blue-700 border hover:bg-white border-blue-700 text-white bg-blue-700"
        type="submit"
        onClick={handleChange}
      >
        Add Data Perbaikan
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
            Tambah Data Perbaikan
          </h1>
          <form onSubmit={handleSubmit} method="POST">
            <div className="mb-2">
              <SelectInput
                id="inventory"
                name="number"
                onChange={(e) => setInventory(e.target.value)}
                label="Nama Inventory"
                className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
              >
                {repairData.map(
                  (repair) => (
                    console.log(repair),
                    (<option value={repair.id}>{repair.kodeAsset}</option>)
                  )
                )}
              </SelectInput>
            </div>
            <div className="mb-2">
              <FormComp
                id="tanggalKerusakan"
                type="date"
                onChange={(e) => setTanggalKerusakan(e.target.value)}
                placeholder="Masukan tanggal kerusakan"
              >
                Tanggal Kerusakan
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
            <div className="mb-2">
              <FormComp
                id="tanggalPerbaikan"
                type="date"
                onChange={(e) => setTanggalPerbaikan(e.target.value)}
                placeholder="Masukan tanggal perbaikan"
              >
                Tanggal Perbaikan
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="biaya"
                type="number"
                onChange={(e) => setBiaya(e.target.value)}
                placeholder="Masukan biaya"
              >
                Biaya
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="tanggaSelesaiPerbaikan"
                type="date"
                onChange={(e) => setTanggalSelesaiPerbaikan(e.target.value)}
                placeholder="Masukan tanggal selesai"
              >
                Tanggal Selesai
              </FormComp>
            </div>
            <div className=" modal-action flex mt-4">
              <Button
                className="bg-blue-600 rounded-[5px] mx-6 text-white text-sm px-4 py-1 hover:bg-green-700"
                type="submit"
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
          </form>
        </div>
      </div>
    </div>
  );
}
