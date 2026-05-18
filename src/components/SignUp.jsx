import { useState } from "react";
import { signup } from "../api/api";

const SignUp = ({
  setIsLoggedIn,
  setCurrentPage,
  setAuthError,
  setIsAdmin,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await signup(formData);

    if (!data || data.message) {
      throw new Error(data.message || "Signup failed");
    }

    sessionStorage.setItem("quickbiteUser", JSON.stringify(data));

    setIsLoggedIn(true);
    setIsAdmin(data.isAdmin || false);

    setCurrentPage("home");
  } catch (error) {
    setAuthError(error.message);
    setCurrentPage("error");
  }
};

  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center px-4 sm:px-6 py-20">
      <div className="w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-3xl p-8">

        <h1 className="text-3xl sm:text-5xl font-serif text-center mb-3">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full bg-[#222] border border-[#333] rounded-xl px-4 py-4"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />

          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full bg-[#222] border border-[#333] rounded-xl px-4 py-4"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full bg-[#222] border border-[#333] rounded-xl px-4 py-4"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />

          <button
            type="submit"
            className="w-full bg-amber-500 text-black py-4 rounded-xl font-bold"
          >
            Create Account
          </button>
        </form>

        <div className="text-center mt-6 text-gray-400">
          Already have an account?
          <button
            onClick={() => setCurrentPage("signin")}
            className="text-amber-400 ml-2"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;