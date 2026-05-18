import { useState } from "react";
import { signin } from "../api/api";

const SignIn = ({
  setIsLoggedIn,
  setCurrentPage,
  setAuthError,
  pendingCheckout,
  setPendingCheckout,
  setIsAdmin,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await signin(formData);

    if (!data || data.message) {
      throw new Error(data.message || "Login failed");
    }

    // SAVE SESSION (ONLY AUTH DATA)
    sessionStorage.setItem("quickbiteUser", JSON.stringify(data));

    setIsLoggedIn(true);
    setIsAdmin(data.isAdmin || false);

    sessionStorage.setItem(
  "quickbiteUser",
  JSON.stringify(data)
);

    setCurrentPage(
      pendingCheckout ? "shipping" : "home"
    );

    setPendingCheckout(false);
  } catch (error) {
    setAuthError(error.message);
    setCurrentPage("error");
  }
};

  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center px-4 sm:px-6 py-20">
      <div className="w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-3xl p-8">

        <h1 className="text-3xl sm:text-5xl font-serif text-center mb-3">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

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
            Sign In
          </button>
        </form>

        <div className="text-center mt-6 text-gray-400">
          Don’t have an account?
          <button
            onClick={() => setCurrentPage("signup")}
            className="text-amber-400 ml-2"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;