import Image from "next/image";
export default function TabelDetailInventoryComp(inventoryData) {
  console.log(inventoryData);
  return (
    <div className="grid lg:grid-cols-5 gap-3">
      <div className="p-4">
        {inventoryData?.gambar ? (
          <Image
            alt={inventoryData?.nama}
            src={
              inventoryData?.gambar.startsWith("/")
                ? inventoryData?.gambar
                : `/${inventoryData?.gambar}`
            }
            width={50}
            height={50}
            className="rounded-[5px bg-gray-200 rounded-md"
          />
        ) : (
          <span>No Image</span>
        )}
      </div>
      <div className="col-span-2 ">
        <table className="table">
          <tbody className="text-left text-[12px]">
            <tr className=" flex flex-row  m-0 border-none">
              <th className="text-gray-600 w-40">Kode Aset</th>
              <td className="w-[250px] ">
                : {inventoryData?.kodeAsset || "-"}
              </td>
            </tr>
            <tr className="flex flex-row border-none">
              <th className="text-gray-600 w-40">Nama</th>
              <td className="w-[250px]">: {inventoryData?.nama || "-"}</td>
            </tr>
            <tr className="flex flex-row border-none">
              <th className="text-gray-600 w-40">Merk</th>
              <td className="w-[250px]">: {inventoryData?.merk || "-"}</td>
            </tr>
            <tr className="flex flex-row border-none">
              <th className="text-gray-600  w-40">Tanggal Pembelian</th>
              <td className="w-[250px]">
                : {inventoryData?.tanggalPembelian || "-"}
              </td>
            </tr>
            <tr className="flex flex-row border-none">
              <th className="text-gray-600 w-40">Harga</th>
              <td className="w-[250px]">: Rp. {inventoryData?.harga || "-"}</td>
            </tr>
            <tr className="flex flex-row border-none">
              <th className="text-gray-600 w-40">Vendor</th>
              <td className="w-[250px]">: {inventoryData?.vendor || "-"}</td>
            </tr>
            <tr className="flex flex-row border-none">
              <th className="text-gray-600 w-40">Status</th>
              <td className="w-[250px]">: {inventoryData?.status || "-"}</td>
            </tr>
            <tr className="flex flex-row border-none">
              <th className="text-gray-600 w-40">No Induk karyawan</th>
              <td className="w-[250px]">
                : {inventoryData?.karyawanInduk || "-"}
              </td>
            </tr>
            <tr className="flex flex-row border-none">
              <th className="text-gray-600 w-40">Deskripsi</th>
              <td className="w-[250px]">: {inventoryData?.deskripsi || "-"}</td>
            </tr>
            <tr className="flex flex-row border-none">
              <th className="text-gray-600 w-40">Nama Ruangan</th>
              <td className="w-[250px]">
                : {inventoryData?.ruanganNama || "-"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="col-span-2 ">
        <table className="table">
          <tbody className="text-left text-[12px]">
            <tr className=" flex flex-row border-none">
              <th className="text-gray-600  w-40">Masa Manfaat</th>
              <td className="w-[250px] ">
                : {inventoryData?.masaManfaat || "-"} Tahun
              </td>
            </tr>
            <tr className="flex flex-row border-none">
              <th className="text-gray-600 w-40">Nilai Residu</th>
              <td className="w-[250px]">
                : Rp. {inventoryData?.nilaiResidu || "-"}
              </td>
            </tr>
            <tr className="flex flex-row border-none">
              <th className="text-gray-600 w-40">Tahun 1</th>
              <td className="w-[250px]">
                : Rp. {inventoryData?.tahun1 || "-"}
              </td>
            </tr>
            <tr className="flex flex-row border-none">
              <th className="text-gray-600 w-40">Tahun 2</th>
              <td className="w-[250px]">
                : Rp. {inventoryData?.tahun2 || "-"}
              </td>
            </tr>
            <tr className="flex flex-row border-none">
              <th className="text-gray-600 w-40">Tahun 3</th>
              <td className="w-[250px]">
                : Rp. {inventoryData?.tahun3 || "-"}
              </td>
            </tr>
            <tr className="flex flex-row border-none">
              <th className="text-gray-600 w-40">Tahun 4</th>
              <td className="w-[250px]">
                : Rp. {inventoryData?.tahun4 || "-"}
              </td>
            </tr>
            <tr className="flex flex-row border-none">
              <th className="text-gray-600 w-40">Depresiasi</th>
              <td className="w-[250px]">
                : Rp. {inventoryData?.depresiasi || "-"}
              </td>
            </tr>
            <tr className="flex flex-row border-none">
              <th className="text-gray-600 w-40">Kategori</th>
              <td className="w-[250px]">
                : {inventoryData?.kategoriNama || "-"}
              </td>
            </tr>
            <tr className="flex flex-row border-none">
              <th className="text-gray-600 w-40">Pembeli</th>
              <td className="w-[250px]">: {inventoryData?.pembeli || "-"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
