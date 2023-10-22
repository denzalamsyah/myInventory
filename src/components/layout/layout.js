export default function Layout({ children }) {
  return (
    <div className="flex w-screen h-screen max-w-[100wh] max-h-[100vh]">
      {children}
    </div>
  );
}
