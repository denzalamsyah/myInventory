export default function TabelDetailInventoryComp({
  kodeAsset,
  nama,
  merk,
  masaManfaat,
  tanggalPembelian,
  harga,
  vendor,
  deskripsi,
  kategoriId,
  karyawanId,
  ruanganId,
  nilaiResedu,
  tahun1,
  tahun2,
  tahun3,
  tahun4,
  depresiasi,
  status,
  pembeli,
}) {
  return (
    <div className="flex gap-2">
      <table className="table">
        <tbody className="text-left text-[12px]">
          <tr className=" flex flex-row border-none">
            <th className="text-gray-600 w-40">Kode Aset</th>
            <td className="w-[250px] ">: {kodeAsset}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Nama</th>
            <td className="w-[250px]">: {nama}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Merk</th>
            <td className="w-[250px]">: {merk}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600  w-40">Tanggal Pembelian</th>
            <td className="w-[250px]">: {tanggalPembelian}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Harga</th>
            <td className="w-[250px]">: Rp. {harga}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Vendor</th>
            <td className="w-[250px]">: {vendor}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Status</th>
            <td className="w-[250px]">: {status}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Nama karyawan</th>
            <td className="w-[250px]">: {karyawanId}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Deskripsi</th>
            <td className="w-[250px]">: {deskripsi}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">ID Ruangan</th>
            <td className="w-[250px]">: {ruanganId}</td>
          </tr>
        </tbody>
      </table>
      <table className="table">
        <tbody className="text-left text-[12px]">
          <tr className=" flex flex-row border-none">
            <th className="text-gray-600  w-40">Masa Manfaat</th>
            <td className="w-[250px] ">: {masaManfaat} Tahun</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Nilai Residu</th>
            <td className="w-[250px]">: Rp. {nilaiResedu}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Tahun 1</th>
            <td className="w-[250px]">: Rp. {tahun1}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Tahun 2</th>
            <td className="w-[250px]">: Rp. {tahun2}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Tahun 3</th>
            <td className="w-[250px]">: Rp. {tahun3}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Tahun 4</th>
            <td className="w-[250px]">: Rp. {tahun4}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Depresiasi</th>
            <td className="w-[250px]">: Rp. {depresiasi}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Kategori</th>
            <td className="w-[250px]">: {kategoriId}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Pembeli</th>
            <td className="w-[250px]">: {pembeli}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
