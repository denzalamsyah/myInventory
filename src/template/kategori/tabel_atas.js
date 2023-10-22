export default function TabelAtasKategori() {
  return (
    <div className="flex space-x-[100px]">
      <div>
        <h1 className="text-[12px] font-bold text-gray-800 mb-2">
          Nama Kategori
        </h1>
        <table>
          <tbody className="text-[12px] text-gray-800 ">
            <tr>
              <td>Aset Kantor</td>
            </tr>
            <tr>
              <td>Aset Perangkat Keras</td>
            </tr>
            <tr>
              <td>Aset Perangkat Lunak</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h1 className="text-[12px] font-bold text-gray-800 mb-2">
          Total Kategori
        </h1>
        <table>
          <tbody className="text-[12px] text-gray-800">
            <tr>
              <td className="text-center px-10">3</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h1 className="text-[12px] font-bold text-gray-800 text-center mb-2">
          Jumlah Aset Kategori Terbesar
        </h1>
        <table>
          <thead className="text-[12px] text-gray-800">
            <tr className="bg-slate-200">
              <td className="px-2 text-center">Aset Kantor</td>
              <td className="px-2">Aset Perangkat Keras</td>
              <td className="px-2">Aset Perangkat Lunak</td>
            </tr>
          </thead>
          <tbody className="text-[12px] text-gray-800 bg-gray-100">
            <tr>
              <td className="text-center">200</td>
              <td className="text-center">250</td>
              <td className="text-center">100</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
