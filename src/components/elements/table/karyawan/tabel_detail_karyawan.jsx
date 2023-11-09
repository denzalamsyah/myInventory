import Image from "next/image";
export default function TabelDetailKaryawanComp({
  id,
  nama,
  gender,
  email,
  telepon,
  jabatan,
  divisi,
  alamat,
  gambar,
}) {
  return (
    <div className="grid gap-3">
      <div className="p-4">
        <Image
          src={gambar}
          alt={nama}
          width={100}
          height={100}
          className="rounded-[5px] bg-gray-400"
        ></Image>
      </div>
      <div className="">
        <table className="table">
          <tbody className="text-left text-[12px]">
            <tr className=" flex flex-row border-none">
              <th className="text-gray-600 w-32">ID Karyawan</th>
              <td className="w-[250px]">: {id}</td>
            </tr>
            <tr className="flex flex-row border-none">
              <th className="text-gray-600 w-32">Nama</th>
              <td className="w-[250px]">: {nama}</td>
            </tr>
            <tr className="flex flex-row border-none">
              <th className="text-gray-600 w-32">Jenis Kelamin</th>
              <td className="w-[250px]">: {gender}</td>
            </tr>
            <tr className="flex flex-row border-none">
              <th className="text-gray-600 w-32">Email</th>
              <td className="w-[250px]">: {email}</td>
            </tr>
            <tr className="flex flex-row border-none">
              <th className="text-gray-600 w-32">Telepon</th>
              <td className="w-[250px]">: {telepon}</td>
            </tr>
            <tr className="flex flex-row border-none">
              <th className="text-gray-600 w-32">Jabatan</th>
              <td className="w-[250px]">: {jabatan}</td>
            </tr>
            <tr className="flex flex-row border-none">
              <th className="text-gray-600 w-32">Divisi</th>
              <td className="w-[250px]">: {divisi}</td>
            </tr>
            <tr className="flex flex-row border-none">
              <th className="text-gray-600 w-32">Alamat</th>
              <td className="w-[250px]">: {alamat}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
