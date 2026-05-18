const CartDrawer = ({
  cart,
  closeCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  handleCheckout,
}) => {
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="w-full sm:w-[420px] h-full bg-[#181818] p-4 sm:p-8 slide-in overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-serif">Your Cart</h2>

          <button onClick={closeCart}>✕</button>
        </div>

        <div className="space-y-6">
          {cart.length === 0 ? (
            <p className="text-gray-400">Cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="bg-[#222] p-4 rounded-2xl"
              >
                <div className="flex justify-between mb-2">
                  <h3>{item.name}</h3>
                  <span>${item.price}</span>
                </div>

                <div className="flex items-center gap-3 mt-4">

  <button
    onClick={() => decreaseQuantity(item.id)}
    className="w-8 h-8 rounded-full bg-[#333] hover:bg-amber-500 hover:text-black transition"
  >
    -
  </button>

  <span className="text-lg font-semibold">
    {item.quantity}
  </span>

  <button
    onClick={() => increaseQuantity(item.id)}
    className="w-8 h-8 rounded-full bg-[#333] hover:bg-amber-500 hover:text-black transition"
  >
    +
  </button>

</div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-3 text-red-400"
                >
                  Remove
                </button>

                
              </div>
            ))
          )}
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <h3 className="text-2xl mb-6">
            Subtotal: ${subtotal.toFixed(2)}
          </h3>

          <button
            onClick={handleCheckout}
            className="w-full bg-amber-500 text-black py-4 rounded-xl font-bold"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;