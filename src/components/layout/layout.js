import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function Layout({ children }) {
  const [profile, setProfile] = useState();
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const res = await fetch(`http://localhost:5000/employee`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (res.ok) {
      const json = await res.json();
      setProfile(json);
    } else {
      router.push("/signin");
    }
  }

  // function logout() {
  //   localStorage.removeItem("token");
  //   router.push("/");
  // }
  return (
    <div className="flex w-screen h-screen max-w-[100wh] max-h-[100vh]">
      {children}
      <button></button>
    </div>
  );
}
