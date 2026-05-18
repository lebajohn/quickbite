import {
  FaShoppingCart,
  FaUtensils,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useState } from "react";

const Navbar = ({
  cartCount,
  openCart,
  isLoggedIn,
  openSignIn,
  logout,
  isAdmin,
  openAdmin,
  openOrders,
}) => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/40 border-b border-white/10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <h1 className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-amber-400 font-serif">
          <FaUtensils />
          QuickBite
        </h1>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-6">

          <div className="flex gap-5 text-sm uppercase tracking-wider">
            <a href="#" className="hover:text-amber-400">
              Home
            </a>

            <a href="#menu" className="hover:text-amber-400">
              Menu
            </a>

            <a href="#categories" className="hover:text-amber-400">
              Categories
            </a>

            <a href="#about" className="hover:text-amber-400">
              About
            </a>
          </div>

          {isLoggedIn && (
            <button
              onClick={openOrders}
              className="hover:text-amber-400"
            >
              My Orders
            </button>
          )}

          {isAdmin && (
            <button
              onClick={openAdmin}
              className="bg-amber-500 text-black px-4 py-2 rounded-xl font-semibold"
            >
              Admin
            </button>
          )}

          {!isLoggedIn ? (
            <button
              onClick={openSignIn}
              className="flex items-center gap-2 bg-amber-500 text-black px-5 py-2 rounded-full font-semibold"
            >
              <FaUser />
              Sign In
            </button>
          ) : (
            <button
              onClick={logout}
              className="border border-red-400 text-red-400 px-4 py-2 rounded-full hover:bg-red-400 hover:text-black"
            >
              Logout
            </button>
          )}

          {/* DESKTOP CART */}
          <button
            onClick={openCart}
            className="relative text-2xl hover:text-amber-400"
          >
            <FaShoppingCart />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* MOBILE RIGHT SIDE */}
        <div className="flex lg:hidden items-center gap-4">

          {/* CART */}
          <button
            onClick={openCart}
            className="relative text-2xl hover:text-amber-400"
          >
            <FaShoppingCart />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* HAMBURGER */}
          <button
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
            className="text-2xl"
          >
            {mobileMenu ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="lg:hidden bg-[#111] px-6 py-5 flex flex-col gap-5 border-t border-white/10">

          <a href="#">Home</a>

          <a href="#menu">Menu</a>

          <a href="#categories">Categories</a>

          <a href="#about">About</a>

          {isLoggedIn && (
            <button
              onClick={openOrders}
              className="text-left"
            >
              My Orders
            </button>
          )}

          {isAdmin && (
            <button
            className="bg-amber-500 text-black px-5 py-3 rounded-xl font-semibold"
              onClick={openAdmin}
            >
              Admin Dashboard
            </button>
          )}

          {!isLoggedIn ? (
            <button
              onClick={openSignIn}
              className="bg-amber-500 text-black px-5 py-3 rounded-xl font-semibold"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={logout}
              className="border border-red-400 text-red-400 px-5 py-3 rounded-xl"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;