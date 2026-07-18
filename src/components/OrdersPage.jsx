const OrdersPage = ({ orders, setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-[#111] text-white px-4 sm:px-6 py-16">
      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl sm:text-5xl font-serif">
            My Orders
          </h1>

          <button
            onClick={() => setCurrentPage("home")}
            className="bg-amber-500 text-black px-6 py-3 rounded-xl font-semibold"
          >
            Back Home
          </button>
        </div>

        <div className="space-y-6">

          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className="bg-[#1a1a1a] p-6 rounded-3xl"
              >
                <div className="flex justify-between mb-4 flex-wrap gap-4">
                  <div>
                    <h2 className="font-bold text-lg">
                      Order ID:
                    </h2>

                    <p className="text-gray-400">
                      {order._id}
                    </p>
                  </div>

                  <div>
                    <p>
                      Paid:
                      <span className="ml-2 text-green-400">
                        {order.isPaid ? "Yes" : "No"}
                      </span>
                    </p>

                    <p>
                      Delivered:
                      <span className="ml-2 text-blue-400">
                        {order.isDelivered
                          ? "Yes"
                          : "No"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {order.orderItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between border-b border-white/10 pb-2"
                    >
                      <p>
                        {item.name} × {item.quantity}
                      </p>

                      <p>
                        ksh
                        {item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-right">
                  <span className="text-amber-400 font-bold text-xl">
                    Total: ksh{order.totalPrice}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;