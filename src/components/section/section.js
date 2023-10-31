export default function Section({ children }) {
  return (
    <div className="flex flex-col w-full h-full bg-gray-200 p-4 md:p-10">
      {children}
    </div>
  );
}
