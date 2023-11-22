import Image from "next/image";
export default function TabelDetailRoomComp(room) {
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      <div className="">
        <Image
          src={room?.gambar}
          alt={room?.kode}
          width={150}
          height={150}
          className="rounded-[5px] bg-gray-400"
        ></Image>
      </div>
      <div className="col-span-2 rounded-sm">
        <table className="table">
          <tbody className="text-left text-[10px] md:text-[12px] 2xl:text-[16px]">
            <tr className=" flex flex-row border-none bg-slate-200">
              <th className="text-gray-600 w-32">Kode Ruangan</th>
              <td className="w-[250px]">: {room?.kode}</td>
            </tr>
            <tr className="flex flex-row border-none bg-slate-100">
              <th className="text-gray-600 w-32">Nama Ruangan</th>
              <td className="w-[250px]">: {room?.nama}</td>
            </tr>
            <tr className="flex flex-row border-none bg-slate-200">
              <th className="text-gray-600 w-32">Lantai</th>
              <td className="w-[250px]">: {room?.lantai}</td>
            </tr>
            <tr className="flex flex-row border-none bg-slate-100">
              <th className="text-gray-600 w-32">Lokasi</th>
              <td className="w-[250px]">: {room?.lokasi}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
