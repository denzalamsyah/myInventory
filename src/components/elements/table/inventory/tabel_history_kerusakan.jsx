export default function TabelDataKerusakanHistoryById(kerusakanData) {
  console.log(kerusakanData);

  return (
    <div className="flex flex-col h-full bg-white">
      <div
        className="grid gap-3 snap-x overflow-auto scroll-smooth scrollbar-thin scrollbar-thumb-red scrollbar-track-gray-200 scrollbar-thumb-hover:#b30000"
        style={{
          height: "65vh",
          width: "100%",
          scrollSnapType: "x mandatory",
        }}
      >
        <div>
          <table className="w-full">
            <thead className="bg-slate-200">
              <tr className="2xl:text-[16px] py-3 border">
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  No
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Kode Aset
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Tanggal Kerusakan
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Deskripsi
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Posisi Terakhir
                </th>
              </tr>
            </thead>
            <tbody className="">
              {Object.keys(kerusakanData).map((key, index) => {
                const data = kerusakanData[key];
                console.log(data);
                return (
                  <tr
                    key={key}
                    className="text-center border text-[12px] 2xl:text-[16px] text-black border-gray-300"
                  >
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2 px-1">
                      {data?.inventoryId.kodeAsset || "-"}
                    </td>
                    <td className="py-2 px-1">
                      {data?.tanggalKerusakan || "-"}
                    </td>
                    <td className="py-2 px-1">{data?.deskripsi || "-"}</td>
                    <td className="py-2 px-1">{data?.posisiTerakhir || "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
