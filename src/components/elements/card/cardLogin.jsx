// import Link from "next/link";
// import React from "react";
// import { PiLockKey } from "react-icons/pi";
// import LabelComp from "../label/label";
// import InputComp from "../input/input";
// import { HiOutlineMail } from "react-icons/hi";
// import { useState } from "react";
// import InputPassComp from "../input/inputPass";
// import Button from "../button/button";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center w-full"
//       style={{
//         backgroundImage: "url(/img/Frame.png)",
//         backgroundSize: "contain",
//         backgroundPosition: "right top", // Posisi gambar di kanan atas
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
//         <h1 className="text-2xl font-semibold mb-8">Sign to your account</h1>
//         <form>
//           <div className="mb-4 relative">
//             <LabelComp htmlFor="email" className="text-gray-600 mb-1 block">
//               Email
//             </LabelComp>
//             <InputComp
//               icon={<HiOutlineMail />}
//               placeholder="enter your email"
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="mb-6 relative">
//             <LabelComp htmlFor="password" className="text-gray-600 mb-1 block">
//               Password
//             </LabelComp>
//             <InputPassComp
//               icon={<PiLockKey />}
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="enter your password"
//             />
//           </div>
//           <div className="mb-4 flex items-center">
//             <input type="checkbox" id="rememberMe" className="mr-2" />
//             <label htmlFor="rememberMe" className="text-gray-600 text-">
//               Remember me
//             </label>
//           </div>

//           <div>
//             <Button
//               href="#"
//               type="submit"
//               className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
//               onChange
//             >
//               Login
//             </Button>
//           </div>
//           <div className="flex flex-col justify-center items-center mt-6">
//             <p className="text-gray-500">Trouble Logging?</p>
//             <Link href="/auth/changepass" className="text-blue-500 mt-3">
//               Reset Password
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import Link from "next/link";
import { useRouter } from "next/router"; // Import useRouter
import React, { useState } from "react";
import { PiLockKey } from "react-icons/pi";
import LabelComp from "../label/label";
import InputComp from "../input/input";
import { HiOutlineMail } from "react-icons/hi";
import InputPassComp from "../input/inputPass";
import Button from "../button/button";

const LoginPage = () => {
  const router = useRouter();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const copy = { ...state };
    copy[e.target.name] = e.target.value;
    setState(copy);
  }

  async function handleSubmit() {
    try {
      const res = await fetch(
        `https://functional-zinc-production.up.railway.app/api/login`,
        {
          method: "POST",
          body: JSON.stringify(state),
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (res.ok) {
        const json = await res.json();
        localStorage.setItem("token", json.token);
        router.push("/dashboard");
      } else {
        console.log("Login gagal");
      }
    } catch (error) {
      console.log("error banget");
      console.log(res);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center w-full"
      style={{
        backgroundImage: "url(/img/Frame.png)",
        backgroundSize: "contain",
        backgroundPosition: "right top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
        <h1 className="text-2xl font-semibold mb-8">Sign to your account</h1>
        <form>
          <div className="mb-4 relative">
            <LabelComp htmlFor="email" className="text-gray-600 mb-1 block">
              Email
            </LabelComp>
            <InputComp
              icon={<HiOutlineMail />}
              placeholder="enter your email"
              id="email"
              type="email"
              name="email"
              value={state.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6 relative">
            <LabelComp htmlFor="password" className="text-gray-600 mb-1 block">
              Password
            </LabelComp>
            <InputPassComp
              icon={<PiLockKey />}
              id="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              placeholder="enter your password"
            />
          </div>
          <div className="mb-4 flex items-center">
            <input type="checkbox" id="rememberMe" className="mr-2" />
            <label htmlFor="rememberMe" className="text-gray-600 text-">
              Remember me
            </label>
          </div>
          <div>
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </div>
          <div className="flex flex-col justify-center items-center mt-6">
            <p className="text-gray-500">Trouble Logging?</p>
            <Link href="/auth/changepass" className="text-blue-500 mt-3">
              Reset Password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
