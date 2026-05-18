import FoodCard from "./FoodCard";

const FoodGrid = ({ foods, openDetails }) => {
  return (
    <section id="menu" className="py-10 px-3 bg-gradient-to-b from-[#111111] via-[#1a120d] to-[#181818]"
>
      <h2 className="text-4xl font-serif text-center mb-12">
        Our Popular Dishes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {foods.map((food) => (
          <FoodCard
            key={food._id}
            food={food}
            openDetails={openDetails}
          />
        ))}
      </div>
    </section>
  );
};

export default FoodGrid;