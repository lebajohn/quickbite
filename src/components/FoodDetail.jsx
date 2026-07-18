import { useState } from "react";
import { rateProduct } from "../api/api";

const FoodDetail = ({ food, addToCart, backToMenu, isLoggedIn, setCurrentPage }) => {
  const [quantity, setQuantity] = useState(1);

  const user = JSON.parse(sessionStorage.getItem("quickbiteUser"));

  const existingRating = food.ratings?.find(
    (r) => r.user?.toString() === user?.id?.toString()
  );

  const [hasRated, setHasRated] = useState(!!existingRating);
  const [rating, setRating] = useState(
    existingRating ? existingRating.value : Math.round(food.rating) || 0
  );
  const [hovered, setHovered] = useState(0);

  const handleRate = async (value) => {
    // Not logged in — prompt to sign in
    if (!isLoggedIn) {
      setCurrentPage("signin");
      return;
    }

    if (hasRated) return;

    try {
      const data = await rateProduct(food._id, value);

      if (data.message) {
        if (data.message === "You already rated this product") setHasRated(true);
        alert(data.message);
        return;
      }

      setRating(value);
      setHasRated(true);
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#111] text-white px-6 py-24 fade-in">
      <button onClick={backToMenu} className="mb-8 text-amber-400">
        ← Back to Menu
      </button>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <img
          src={food.image}
          alt={food.name}
          className="rounded-3xl w-full h-[300px] sm:h-[500px] lg:h-[600px] object-cover"
        />

        <div>
          <h1 className="text-5xl font-serif mb-6">{food.name}</h1>
          <p className="text-gray-300 text-lg mb-6">{food.description}</p>
          <p className="text-4xl text-amber-400 font-bold mb-6">ksh{food.price}</p>

          <div className="mb-8">
            <p className="text-sm text-gray-400 mb-2">
              {!isLoggedIn
                ? "Sign in to rate this product:"
                : hasRated
                ? "Your rating:"
                : "Rate this product:"}
            </p>

            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRate(star)}
                  disabled={hasRated}
                  onMouseEnter={() => !hasRated && setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  className={`text-3xl transition-transform ${
                    star <= (hovered || rating)
                      ? "text-amber-400"
                      : "text-gray-500"
                  } ${
                    !hasRated
                      ? "hover:scale-125 cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            {!isLoggedIn ? (
              <p
                className="text-xs text-amber-400 cursor-pointer underline"
                onClick={() => setCurrentPage("signin")}
              >
                Sign in to rate this product
              </p>
            ) : hasRated ? (
              <p className="text-xs text-green-400">✓ You already rated this product</p>
            ) : (
              <p className="text-xs text-gray-500">Click a star to rate</p>
            )}
          </div>

          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-[#222] px-4 py-2 rounded-lg"
            >
              -
            </button>
            <span className="text-2xl">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="bg-[#222] px-4 py-2 rounded-lg"
            >
              +
            </button>
          </div>

          <button
            onClick={() => addToCart(food, quantity)}
            className="bg-amber-500 text-black px-8 py-4 rounded-xl font-bold hover:bg-amber-400 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;