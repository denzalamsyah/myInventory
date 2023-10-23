export default function ChildCard({ tittle, children, className }) {
  return (
    <div className="bg-white w-full h-36 rounded-md px-5 py-3 mb-4 shadow-lg">
      <div className="mb-2 font-bold text-black ">{tittle}</div>
      <div className={className}>{children}</div>
    </div>
  );
}
