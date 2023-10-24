export default function TabelDetailKaryawanComp({
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
    <table className="table">
      <tbody className="text-left">
        <tr className=" flex flex-row border-none">
          <th className="text-gray-600 w-56">ID Karyawan</th>
          <td className="w-[500px]">{id}</td>
        </tr>
        <tr className="flex flex-row border-none">
          <th className="text-gray-600 w-56">Nama</th>
          <td className="w-[500px]">{nama}</td>
        </tr>
        <tr className="flex flex-row border-none">
          <th className="text-gray-600 w-56">Jenis Kelamin</th>
          <td className="w-[500px]">{gender}</td>
        </tr>
        <tr className="flex flex-row border-none">
          <th className="text-gray-600 w-56">Email</th>
          <td className="w-[500px]">{email}</td>
        </tr>
        <tr className="flex flex-row border-none">
          <th className="text-gray-600 w-56">Telepon</th>
          <td className="w-[500px]">{telepon}</td>
        </tr>
        <tr className="flex flex-row border-none">
          <th className="text-gray-600 w-56">Jabatan</th>
          <td className="w-[500px]">{jabatan}</td>
        </tr>
        <tr className="flex flex-row border-none">
          <th className="text-gray-600 w-56">Divisi</th>
          <td className="w-[500px]">{divisi}</td>
        </tr>
        <tr className="flex flex-row border-none">
          <th className="text-gray-600 w-56">Alamat</th>
          <td className="w-[500px]">{alamat}</td>
        </tr>
      </tbody>
    </table>
  );
}
