export default function Section({ children }) {
  return (
    <div className="flex-1 flex-col h-screen bg-gray-200 p-4 md:p-10">
      {children}
    </div>
  );
}
