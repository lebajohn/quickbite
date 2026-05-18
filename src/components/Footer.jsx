import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaUtensils,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      id="about"
      className="bg-black border-t border-white/10 pt-20 pb-10 px-6"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-14">

        {/* BRAND */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <FaUtensils className="text-amber-400 text-2xl" />

            <h2 className="text-3xl font-serif text-amber-400">
              QuickBite
            </h2>
          </div>

          <p className="text-gray-400 leading-7">
            Premium food delivery experience with rich flavors,
            lightning-fast delivery, and unforgettable meals.
          </p>

          <div className="flex gap-4 mt-6">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-[#1b1b1b] hover:bg-amber-500 hover:text-black transition flex items-center justify-center"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-[#1b1b1b] hover:bg-amber-500 hover:text-black transition flex items-center justify-center"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-[#1b1b1b] hover:bg-amber-500 hover:text-black transition flex items-center justify-center"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-white">
            Quick Links
          </h3>

          <ul className="space-y-4 text-gray-400">
            <li>
              <a href="#" className="hover:text-amber-400 transition">
                Home
              </a>
            </li>

            <li>
              <a href="#menu" className="hover:text-amber-400 transition">
                Menu
              </a>
            </li>

            <li>
              <a href="#categories" className="hover:text-amber-400 transition">
                Categories
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-amber-400 transition">
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-white">
            Support
          </h3>

          <ul className="space-y-4 text-gray-400">
            <li>
              <a href="#" className="hover:text-amber-400 transition">
                Contact Us
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-amber-400 transition">
                Privacy Policy
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-amber-400 transition">
                Terms & Conditions
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-amber-400 transition">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-white">
            Contact
          </h3>

          <div className="space-y-5 text-gray-400">

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-amber-400 mt-1" />

              <p>Nairobi, Kenya</p>
            </div>

            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-amber-400" />

              <p>+254 711 110 000</p>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-amber-400" />

              <p>support@quickbite.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 mt-16 pt-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} QuickBite. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;