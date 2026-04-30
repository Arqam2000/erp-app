// import React from 'react'

// const Login = () => {
//   return (
//     <div className='bg-gray-200 h-screen flex items-center justify-center'>
//       <div className='bg-white p-8 rounded-4xl shadow-md w-80'>
//         <h2 className='text-2xl font-bold mb-6 text-center'>Login Now!</h2>
//         <form>
//           <div className='mb-4'>
//             <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
//               Username
//             </label>  
//             <input
//               className='shadow appearance-none border rounded-full w-full py-3 px-5 text-gray-700 bg-[#f4f6fa] leading-tight focus:outline-none focus:shadow-outline'
//               id='username'
//               type='text'
//               placeholder='Enter your username'
//             />
//           </div>
//           <div className='mb-4'>
//             <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
//               Email
//             </label>  
//             <input
//               className='shadow appearance-none border rounded-full w-full py-3 px-5 text-gray-700 bg-[#f4f6fa] leading-tight focus:outline-none focus:shadow-outline'
//               id='email'
//               type='email'
//               placeholder='Enter your email'
//             />
//           </div>
//           <div className='mb-6'>
//             <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
//               Password
//             </label>
//             <input
//               className='shadow appearance-none border rounded-full w-full py-3 px-5 text-gray-700 bg-[#f4f6fa] mb-3 leading-tight focus:outline-none focus:shadow-outline'
//               id='password'
//               type='password'
//               placeholder='Enter your password'
//             />
//           </div>
//           <div className='flex items-center justify-between'>
//             <button
//               className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full'
//               type='button'
//             >
//               Sign In
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Login



// import { useState } from "react";

// export default function Login() {
//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">

//       {/* Card */}
//       <div className="w-[335px] md:w-90 bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/40">

//         <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
//           Login Now
//         </h1>

//         {/* Username */}
//         <div className="mb-5">
//           <label className="block text-sm font-semibold text-gray-600 mb-2">
//             Username
//           </label>
//           <input
//             type="text"
//             name="username"
//             placeholder="Enter your username"
//             value={form.username}
//             onChange={handleChange}
//             className="w-full px-5 py-3 rounded-full border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
//           />
//         </div>

//         {/* Email */}
//         <div className="mb-5">
//           <label className="block text-sm font-semibold text-gray-600 mb-2">
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full px-5 py-3 rounded-full border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//           />
//         </div>

//         {/* Password */}
//         <div className="mb-7">
//           <label className="block text-sm font-semibold text-gray-600 mb-2">
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             placeholder="Enter your password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full px-5 py-3 rounded-full border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//           />
//         </div>

//         {/* Button */}
//         <button
//           className="w-full py-3 rounded-full text-white font-semibold text-lg 
//           bg-gradient-to-r from-blue-500 to-indigo-600 
//           hover:from-blue-600 hover:to-indigo-700 
//           transition-all duration-300 shadow-lg hover:shadow-xl"
//         >
//           Sign In
//         </button>
//       </div>
//     </div>
//   );
// }


// apealing looking login page with tailwind css

import { useEffect, useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useLoginName from "../context/LoginContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    id: null,
    username: "",
    password: ""
  })
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const {setLoginName, setLoginId} = useLoginName()

  const submit = async () => {
    try {
      console.log("user", user)

      if (user.password === password) {
        // alert("password is correct")
        navigate("/home")
      } else {
        alert("wrong password")
      }


    } catch (error) {
      console.log("Error:", error)
    }
  }

  useEffect(() => {
    setUsername("");

    if (!user.id) return;

    console.log("user", user)


    axios.post("/api/get-user", { id: user.id })
      .then(res => {
        console.log("resp", res.data)
        // setUser({ ...user, username: res.data.data[0]?.username })
        setUsername(res.data.data[0]?.username || "");
        setPassword(res.data.data[0]?.password || "");
        setLoginName(res.data.data[0]?.username || "")
        setLoginId(res.data.data[0]?.id || null)
        localStorage.setItem("loginName", res.data.data[0]?.username || "")
        localStorage.setItem("loginId", res.data.data[0]?.id || "")
      })
      .catch(err => {
        console.log("Error:", err)
      })
  }, [user.id])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-6">

      {/* Glass Card */}
      <div className="w-[400px] bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-6">

        <h1 className="text-4xl font-bold text-center text-white mb-2">
          Kay QMS
        </h1>
        <p className="text-center text-white/80 mb-8">
          Login to continue
        </p>

        <div className="relative mb-5">
          {/* <Mail className="absolute left-4 top-3.5 text-gray-500" size={18} /> */}
          <User className="absolute left-4 top-3.5 text-gray-500" size={18} />
          <input
            type="number"
            placeholder="Enter your ID"
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/90 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            onChange={(e) => setUser({ ...user, id: e.target.value })}
          />
        </div>

        {/* Username */}
        <div className="relative mb-5">
          <User className="absolute left-4 top-3.5 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Username"
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/90 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            value={username}
          />
        </div>

        {/* Email */}


        {/* Password */}
        <div className="relative mb-6">
          <Lock className="absolute left-4 top-3.5 text-gray-500" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full pl-11 pr-20 py-3 rounded-xl bg-white/90 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3 text-sm text-purple-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* <div className="text-right mb-6">
          <button className="text-sm text-white hover:underline">
            Forgot Password?
          </button>
        </div> */}

        {/* Login Button */}
        <button className="w-full py-3 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105 transition duration-300 shadow-lg"
          onClick={submit}
        >
          Sign In
        </button>

        {/* Divider */}
        {/* <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/40"></div>
          <span className="text-white/80 text-sm">or continue with</span>
          <div className="flex-1 h-px bg-white/40"></div>
        </div> */}

        {/* Social Login */}
        {/* <div className="grid grid-cols-2 gap-4">
          <button className="bg-white text-gray-700 py-2 rounded-xl font-medium hover:shadow-md transition">
            Google
          </button>
          <button className="bg-white text-gray-700 py-2 rounded-xl font-medium hover:shadow-md transition">
            Facebook
          </button>
        </div> */}
      </div>
    </div>
  );
}