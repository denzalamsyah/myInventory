import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/login");
  };
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen max-w-[100wh] max-h-[100vh]">
      <h1 className="text-3xl font-bold underline text-red-500 mb-4">
        Welcome to WIT Admin
      </h1>
      <button class="btn  btn-outline btn-error" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
