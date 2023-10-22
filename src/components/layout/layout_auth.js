export default function LayoutAuth({ children }) {
  return (
    <div className="flex justify-center items-center w-screen h-screen max-w-[100wh] max-h-[100vh] bg-opacity-80 bg-black">
      <div
        className="h-screen flex items-center justify-center w-full"
        style={{
          backgroundImage: "url(/img/Frame.png)",
          backgroundSize: "contain",
          backgroundPosition: "right top",
          backgroundRepeat: "no-repeat",
        }}
      >
        {children}
      </div>
    </div>
  );
}
