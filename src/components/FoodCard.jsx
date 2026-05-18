
const FoodCard = ({ food, openDetails }) => {
  return (
    <div className="bg-[#1d1d1d] rounded-3xl overflow-hidden hover:scale-105 hover:shadow-2xl transition duration-300 flex flex-col h-full">

      {/* IMAGE CONTAINER (FIXED HEIGHT) */}
      <div className="w-full h-56 overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* BODY */}
      <div className="p-6 flex flex-col flex-1">

        <h3 className="text-2xl font-serif mb-2">
          {food.name}
        </h3>

        {/* DESCRIPTION FLEX GROWS */}
        <p className="text-gray-400 mb-4 flex-1">
          {food.description}
        </p>

        {/* FOOTER ALWAYS AT BOTTOM */}
        <div className="mt-auto">

          <div className="flex justify-between items-center mb-4">
            <span className="text-amber-400 text-xl font-bold">
              ${food.price}
            </span>

            <span>
              {"★".repeat(food.rating)}
              {"☆".repeat(5 - food.rating)}
            </span>
          </div>

          <button
            onClick={() => openDetails(food)}
            className="w-full bg-amber-500 text-black py-3 rounded-xl font-bold hover:bg-amber-400 transition"
          >
            View Details
          </button>

        </div>
      </div>
    </div>
  );
};

export default FoodCard;