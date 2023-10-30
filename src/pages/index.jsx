import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen max-w-[100wh] max-h-[100vh]">
      <h1 className="text-3xl font-bold underline text-red-500 mb-4">
        Welcome to WIT Admin
      </h1>
      <Link href="/login">
        <button className="btn btn-outline btn-error">Login</button>
      </Link>
    </div>
  );
}
