"use client";
import Button from "@/components/elements/button/button";
import FormComp from "@/components/form/form";
import SelectInput from "@/components/form/select";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function UpdatePerbaikan(repair) {
  const [modal, setModal] = useState(false);
  const [repairData, setRepairData] = useState([]);
  const [inventory, setInventory] = useState(repair.inventoryId);
  const [tanggalKerusakan, setTanggalKerusakan] = useState(
    repair.tanggalKerusakan
  );
  const [deskripsi, setDeskripsi] = useState(repair.deskripsi);
  const [tanggalPerbaikan, setTanggalPerbaikan] = useState(
    repair.tanggalPerbaikan
  );
  const [biaya, setBiaya] = useState(repair.biaya);
  const [tanggalSelesaiPerbaikan, setTanggalSelesaiPerbaikan] = useState(
    repair.tanggalSelesaiPerbaikan
  );
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  console.log(inventory);
  function handleChange() {
    setModal(!modal);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:9000/api/perbaikan/${repair.id}`,
      {
        method: "PUT",
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
      }
    );
    console.log(response);
    if (response.ok) {
      setModal(false);
      MySwal.fire("Updated!", "Klik tombol!", "success").then(() => {
        router.refresh();
      });
    } else {
      MySwal.fire("Update Gagal", "Klik tombol!", "error");
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
      <Link className="text-[#10A760]" href="" onClick={handleChange}>
        <PiPencilSimpleLineFill />
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
            Edit kategori {repair.inventoryId.kodeAsset}
          </h1>
          <div>
            <div className="mb-2">
              <SelectInput
                id="inventory"
                name="number"
                value={inventory}
                onChange={(e) => setInventory(e.target.value)}
                label="Nama Inventory"
                className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
              >
                {repairData.map(
                  (repair) => (
                    console.log(repair),
                    (
                      <option key={repair.id} value={repair.id}>
                        {repair.kodeAsset}
                      </option>
                    )
                  )
                )}
              </SelectInput>
            </div>
            <div className="mb-2">
              <FormComp
                id="tanggalKerusakan"
                type="date"
                onChange={(e) => setTanggalKerusakan(e.target.value)}
                placeholder={repair.tanggalKerusakan}
                value={tanggalKerusakan}
              >
                Tanggal Kerusakan
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="deskripsi"
                type="text"
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder={repair.deskripsi}
                value={deskripsi}
              >
                Deskripsi
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="tanggalPerbaikan"
                type="date"
                onChange={(e) => setTanggalPerbaikan(e.target.value)}
                placeholder={repair.tanggalPerbaikan}
                value={tanggalPerbaikan}
              >
                Tanggal Perbaikan
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="biaya"
                type="number"
                onChange={(e) => setBiaya(e.target.value)}
                placeholder={repair.biaya}
                value={biaya}
              >
                Biaya
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="tanggaSelesaiPerbaikan"
                type="date"
                onChange={(e) => setTanggalSelesaiPerbaikan(e.target.value)}
                placeholder={repair.tanggalSelesaiPerbaikan}
                value={tanggalSelesaiPerbaikan}
              >
                Tanggal Selesai
              </FormComp>
            </div>
            <div className=" modal-action flex mt-4">
              <Button
                className="bg-blue-600 rounded-[5px] mx-6 text-white text-sm px-4 py-1 hover:bg-green-700"
                onClick={handleUpdate}
              >
                Update
              </Button>
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
