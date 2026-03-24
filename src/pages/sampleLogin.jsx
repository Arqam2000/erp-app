import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 p-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              ⚛
            </div>
            React Login
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-4">
              Welcome Back 👋
            </h1>
            <p className="text-white/80">
              Sign in to continue accessing your dashboard and manage your
              account easily.
            </p>
          </div>

          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} Your Company
          </p>
        </div>

        {/* Right Side */}
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Login
          </h2>
          <p className="text-gray-500 mb-8">
            Please enter your account details
          </p>

          <form className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-4 text-sm text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" />
                Remember me
              </label>

              <a
                href="#"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition"
            >
              Login
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="border py-2 rounded-lg hover:bg-gray-50"
              >
                Google
              </button>
              <button
                type="button"
                className="border py-2 rounded-lg hover:bg-gray-50"
              >
                Facebook
              </button>
            </div>

            {/* Signup */}
            <p className="text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <span className="text-blue-600 cursor-pointer hover:underline">
                Sign up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}