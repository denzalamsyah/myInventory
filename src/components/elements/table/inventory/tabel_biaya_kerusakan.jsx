export default function TabelBiayaKerusakanById(bayarData) {
  console.log(bayarData);

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
                  Kode Aset
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Biaya Rp.
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Total Biaya Perbaikan
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Harga Produk
                </th>
              </tr>
            </thead>
            <tbody className="">
              <tr className="text-center border text-[12px] 2xl:text-[16px] text-black border-gray-300">
                <td className="py-2 px-2">{bayarData?.nama || "-"}</td>
                <td className="py-2 px-2">
                  <ul>
                    {bayarData?.daftarBiaya?.map((biaya, index) => (
                      <li key={index}>{biaya || "-"}</li>
                    ))}
                  </ul>
                </td>
                <td className="py-2 px-2">Rp. {bayarData?.total || "-"}</td>
                <td className="py-2 px-2">Rp. {bayarData?.harga || "-"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
