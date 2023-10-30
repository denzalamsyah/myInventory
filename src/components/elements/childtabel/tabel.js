export default function ChildCard({ tittle, children, className }) {
  return (
    <div className="bg-white md:w-full h-72 md:h-36 2xl:h-52 2xl:px-8 2xl:py-8 rounded-md px-2 md:px-5 py-2 md:py-3 mb-4 shadow-lg">
      <div className="mb-2 font-bold text-black 2xl:text-[20px] ">{tittle}</div>
      <div className={className}>{children}</div>
    </div>
  );
}
