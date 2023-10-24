export default function TabelDetailInventoryComp({
  id,
  nama,
  gender,
  email,
  telepon,
  jabatan,
  divisi,
  alamat,
}) {
  return (
    <div className="flex gap-4 border">
      <table className="table">
        <tbody className="text-left">
          <tr className=" flex flex-row border-none">
            <th className="text-gray-600 w-40">Kode Aset</th>
            <td className="w-[250px] ">: {id}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Nama</th>
            <td className="w-[250px]">: {nama}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Merk</th>
            <td className="w-[250px]">: {gender}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600  w-40">Tanggal Pembelian</th>
            <td className="w-[250px]">: {email}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Harga</th>
            <td className="w-[250px]">: {telepon}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Ruangan</th>
            <td className="w-[250px]">: {jabatan}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Status</th>
            <td className="w-[250px]">: {divisi}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Nomor Induk</th>
            <td className="w-[250px]">: {alamat}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Deskripsi</th>
            <td className="w-[250px]">: {alamat}</td>
          </tr>
        </tbody>
      </table>
      <table className="table">
        <tbody className="text-left">
          <tr className=" flex flex-row border-none">
            <th className="text-gray-600  w-40">Masa Manfaat</th>
            <td className="w-[250px] ">: {id}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Nilai Resedu</th>
            <td className="w-[250px]">: {nama}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Tahun 1</th>
            <td className="w-[250px]">: {gender}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Tahun 2</th>
            <td className="w-[250px]">: {email}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Tahun 3</th>
            <td className="w-[250px]">: {telepon}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Tahun 4</th>
            <td className="w-[250px]">: {jabatan}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">Depresiasi</th>
            <td className="w-[250px]">: {divisi}</td>
          </tr>
          <tr className="flex flex-row border-none">
            <th className="text-gray-600 w-40">ID Kategri</th>
            <td className="w-[250px]">: {alamat}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
