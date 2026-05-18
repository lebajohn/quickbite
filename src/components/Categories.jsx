
import {
  FaHamburger,
  FaPizzaSlice,
  FaWineGlassAlt,
} from "react-icons/fa";

import {
  GiForkKnifeSpoon,
  GiNoodles,
} from "react-icons/gi";

const categories = [
  { name: "All", icon: <GiForkKnifeSpoon /> },
  { name: "Burgers", icon: <FaHamburger /> },
  { name: "Pizza", icon: <FaPizzaSlice /> },
  { name: "Pasta", icon: <GiNoodles /> },
  { name: "Drinks", icon: <FaWineGlassAlt /> },
];

const Categories = ({ activeCategory, setActiveCategory }) => {
  return (
    <section
      id="categories"
      className="py-24 px-6 bg-gradient-to-b from-[#181818] via-[#22160f] to-[#111111]"
    >
      <h2 className="text-4xl md:text-5xl font-serif mb-14 text-center">
        Browse by Category
      </h2>

      <div className="flex md:justify-center gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-4 px-1 scrollbar-hide">

        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={`flex-shrink-0 w-[120px] md:w-[140px] px-4 md:px-6 py-4 md:py-5 rounded-2xl transition-all duration-300 border backdrop-blur-md hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(251,191,36,0.18)]
            ${
              activeCategory === cat.name
                ? "bg-amber-500 text-black border-amber-300"
                : "bg-[#1a1a1a]/90 border-[#333] text-white hover:border-amber-400"
            }`}
          >
            <div className="text-2xl md:text-3xl mb-3 flex justify-center">
              {cat.icon}
            </div>

            <p className="font-semibold text-xs md:text-sm tracking-wide uppercase">
              {cat.name}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;