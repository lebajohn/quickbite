const ShippingPage = ({
  shippingData,
  setShippingData,
  setCurrentPage,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    setCurrentPage("payment");
  };

  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center px-6 py-20">

      <div className="w-full max-w-2xl bg-[#1a1a1a] border border-white/10 rounded-3xl p-8">

        <h1 className="text-5xl font-serif mb-8 text-center">
          Shipping Details
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Full Name"
            required
            value={shippingData.fullName}
            onChange={(e) =>
              setShippingData({
                ...shippingData,
                fullName: e.target.value,
              })
            }
            className="w-full bg-[#222] border border-[#333] rounded-xl px-4 py-4 outline-none focus:border-amber-500"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            required
            value={shippingData.phone}
            onChange={(e) =>
              setShippingData({
                ...shippingData,
                phone: e.target.value,
              })
            }
            className="w-full bg-[#222] border border-[#333] rounded-xl px-4 py-4 outline-none focus:border-amber-500"
          />

          <input
            type="text"
            placeholder="Delivery Address"
            required
            value={shippingData.address}
            onChange={(e) =>
              setShippingData({
                ...shippingData,
                address: e.target.value,
              })
            }
            className="w-full bg-[#222] border border-[#333] rounded-xl px-4 py-4 outline-none focus:border-amber-500"
          />

          <input
            type="text"
            placeholder="City"
            required
            value={shippingData.city}
            onChange={(e) =>
              setShippingData({
                ...shippingData,
                city: e.target.value,
              })
            }
            className="w-full bg-[#222] border border-[#333] rounded-xl px-4 py-4 outline-none focus:border-amber-500"
          />

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 transition text-black py-4 rounded-xl font-bold"
          >
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingPage;