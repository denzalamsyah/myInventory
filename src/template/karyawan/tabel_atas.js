export default function TabelAtasKaryawan() {
  return (
    <div className="flex space-x-[100px]">
      <div>
        <h1 className="text-[12px] font-bold text-gray-800 mb-2">Divisi</h1>
        <table>
          <thead>
            <tr className="bg-green-200">
              <td className="px-2 text-[12px] text-gray-800">BackEnd</td>
              <td className="px-2 text-[12px] text-gray-800">FrontEnd</td>
              <td className="px-2 text-[12px] text-gray-800">UI/UX</td>
              <td className="px-2 text-[12px] text-gray-800">Marketing</td>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800 bg-gray-100">
            <tr>
              <td className="text-[12px] text-gray-800 text-center">11</td>
              <td className="px-2 text-[12px] text-gray-800 text-center">8</td>
              <td className="px-2 text-[12px] text-gray-800 text-center">5</td>
              <td className="px-2 text-[12px] text-gray-800 text-center">5</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h1 className="text-[12px] font-bold text-gray-800 mb-2">Jabatan</h1>
        <table>
          <tbody className="text-[12px] text-gray-800">
            <tr>
              <td className="text-center px-5">-</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h1 className="text-[12px] font-bold text-gray-800 text-center mb-2">
          Gender
        </h1>
        <table>
          <thead className="text-[12px] text-gray-800 bg-red-300">
            <tr>
              <td className="px-2">Perempuan</td>
              <td className="px-2">Laki-Laki</td>
            </tr>
          </thead>
          <tbody className="text-[12px] text-gray- bg-gray-100">
            <tr>
              <td className="text-center text-[12px] text-gray-800">15</td>
              <td className="text-center text-[12px] text-gray-800">70</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
