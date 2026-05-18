const PaymentPage = ({
  paymentMethod,
  setPaymentMethod,
  placeOrder,
}) => {
  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center px-6 py-20">

      <div className="w-full max-w-xl bg-[#1a1a1a] border border-white/10 rounded-3xl p-8">

        <h1 className="text-5xl font-serif mb-10 text-center">
          Payment Method
        </h1>

        <div className="space-y-5">

          <button
            onClick={() => setPaymentMethod("Cash on Delivery")}
            className={`w-full p-5 rounded-2xl border text-left transition ${
              paymentMethod === "Cash on Delivery"
                ? "border-amber-500 bg-amber-500/10"
                : "border-[#333] bg-[#222]"
            }`}
          >
            💵 Cash on Delivery
          </button>

          <button
            onClick={() => setPaymentMethod("M-Pesa")}
            className={`w-full p-5 rounded-2xl border text-left transition ${
              paymentMethod === "M-Pesa"
                ? "border-amber-500 bg-amber-500/10"
                : "border-[#333] bg-[#222]"
            }`}
          >
            📱 M-Pesa
          </button>

          <button
            disabled={!paymentMethod}
            onClick={placeOrder}
            className="w-full mt-8 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 transition text-black py-4 rounded-xl font-bold"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;