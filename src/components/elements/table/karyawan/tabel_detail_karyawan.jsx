import Image from "next/image";
export default function TabelDetailKaryawanComp(employeeData) {
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      <div className="">
        <Image
          src={employeeData?.gambar}
          alt={employeeData?.nama}
          width={100}
          height={100}
          className="rounded-[5px] bg-gray-400"
        ></Image>
      </div>
      <div className="col-span-2 rounded-sm">
        <table className="table">
          <tbody className="text-left text-[10px] md:text-[12px] 2xl:text-[16px]">
            <tr className=" flex flex-row border-none bg-slate-200">
              <th className="text-gray-600 w-32">ID Karyawan</th>
              <td className="w-[250px]">: {employeeData?.id}</td>
            </tr>
            <tr className="flex flex-row border-none bg-slate-100">
              <th className="text-gray-600 w-32">Nama</th>
              <td className="w-[250px]">: {employeeData?.nama}</td>
            </tr>
            <tr className="flex flex-row border-none bg-slate-200">
              <th className="text-gray-600 w-32">Jenis Kelamin</th>
              <td className="w-[250px]">: {employeeData?.gender}</td>
            </tr>
            <tr className="flex flex-row border-none bg-slate-100">
              <th className="text-gray-600 w-32">Email</th>
              <td className="w-[250px]">: {employeeData?.email}</td>
            </tr>
            <tr className="flex flex-row border-none bg-slate-200">
              <th className="text-gray-600 w-32">Telepon</th>
              <td className="w-[250px]">: {employeeData?.telepon}</td>
            </tr>
            <tr className="flex flex-row border-none bg-slate-100">
              <th className="text-gray-600 w-32">Jabatan</th>
              <td className="w-[250px]">: {employeeData?.jabatan}</td>
            </tr>
            <tr className="flex flex-row border-none bg-slate-200">
              <th className="text-gray-600 w-32">Divisi</th>
              <td className="w-[250px]">: {employeeData?.divisi}</td>
            </tr>
            <tr className="flex flex-row border-none bg-slate-100">
              <th className="text-gray-600 w-32">Alamat</th>
              <td className="w-[250px]">: {employeeData?.alamat}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
