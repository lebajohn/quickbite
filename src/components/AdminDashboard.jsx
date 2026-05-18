import { updateOrder, deleteUser } from "../api/api";
import {
  FiShoppingBag,
  FiUsers,
  FiDollarSign,
  FiCheckCircle,
  FiTruck,
  FiGrid,
  FiHome,
  FiUser,
  FiPhone,
  FiMapPin,
  FiHash,
  FiCreditCard,
  FiTrash2,
} from "react-icons/fi";

const AdminDashboard = ({
  orders,
  setOrders,
  users,
  setUsers,
  setCurrentPage,
}) => {
  const totalSales = orders.reduce(
    (acc, order) => acc + order.totalPrice,
    0
  );

  const markPaid = async (id) => {
    await updateOrder(id, { isPaid: true });
    setOrders((prev) =>
      prev.map((order) =>
        order._id === id ? { ...order, isPaid: true } : order
      )
    );
  };

  const markDelivered = async (id) => {
    await updateOrder(id, { isDelivered: true });
    setOrders((prev) =>
      prev.map((order) =>
        order._id === id ? { ...order, isDelivered: true } : order
      )
    );
  };

  const handleDeleteUser = async (id) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  try {
    await deleteUser(id);
    setUsers((prev) => prev.filter((user) => user._id !== id));
  } catch (error) {
    alert("Failed to delete user: " + error.message);
  }
};

  return (
    <div className="min-h-screen bg-[#111] text-white px-4 sm:px-6 py-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
          <h1 className="text-5xl font-serif">Admin Dashboard</h1>

          <div className="flex gap-3">
            <button
              onClick={() => setCurrentPage("admin-products")}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 transition text-black px-6 py-3 rounded-xl font-semibold"
            >
              <FiGrid className="text-[18px]" />
              Manage Products
            </button>

            <button
              onClick={() => setCurrentPage("home")}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 transition text-black px-6 py-3 rounded-xl font-semibold"
            >
              <FiHome className="text-[18px]" />
              Back Home
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#1a1a1a] p-8 rounded-3xl flex items-center gap-5">
            <div className="bg-amber-500/10 p-4 rounded-2xl">
              <FiShoppingBag className="text-[28px] text-amber-400" />
            </div>
            <div>
              <p className="text-gray-400 mb-1">Total Orders</p>
              <h2 className="text-4xl font-bold">{orders.length}</h2>
            </div>
          </div>

          <div className="bg-[#1a1a1a] p-8 rounded-3xl flex items-center gap-5">
            <div className="bg-blue-500/10 p-4 rounded-2xl">
              <FiUsers className="text-[28px] text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 mb-1">Users</p>
              <h2 className="text-4xl font-bold">{users.length}</h2>
            </div>
          </div>

          <div className="bg-[#1a1a1a] p-8 rounded-3xl flex items-center gap-5">
            <div className="bg-green-500/10 p-4 rounded-2xl">
              <FiDollarSign className="text-[28px] text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 mb-1">Revenue</p>
              <h2 className="text-4xl font-bold text-amber-400">${totalSales}</h2>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-[#1a1a1a] rounded-3xl p-8">
          <h2 className="text-3xl mb-8 font-serif">Orders</h2>

          <div className="space-y-6">
            {orders.length === 0 ? (
              <p className="text-gray-400">No orders yet.</p>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="bg-[#222] p-6 rounded-2xl">

                  {/* Order Header */}
                  <div className="flex justify-between flex-wrap gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <FiHash className="text-[16px] text-gray-400" />
                        <h3 className="font-bold text-lg">{order._id}</h3>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <FiCreditCard className="text-[14px]" />
                        <span>{order.paymentMethod}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
  <FiUser className="text-[14px]" />
  <span>{order.user?.email || "Unknown user"}</span>
</div>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                      {!order.isPaid && (
                        <button
                          onClick={() => markPaid(order._id)}
                          className="flex items-center gap-2 bg-green-500 hover:bg-green-400 transition px-4 py-2 rounded-xl text-black font-semibold"
                        >
                          <FiCheckCircle className="text-[16px]" />
                          Mark Paid
                        </button>
                      )}

                      {!order.isDelivered && (
                        <button
                          onClick={() => markDelivered(order._id)}
                          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 transition px-4 py-2 rounded-xl text-black font-semibold"
                        >
                          <FiTruck className="text-[16px]" />
                          Mark Delivered
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-2 mb-4">
                    {order.orderItems?.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between border-b border-white/10 pb-2 text-sm"
                      >
                        <p>{item.name} × {item.quantity}</p>
                        <p>${item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>

                  {/* Status + Total + Shipping */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FiCheckCircle className="text-[15px] text-green-400" />
                        <p>Paid: <span className="ml-2 text-green-400">{order.isPaid ? "Yes" : "No"}</span></p>
                      </div>

                      <div className="flex items-center gap-2">
                        <FiTruck className="text-[15px] text-blue-400" />
                        <p>Delivered: <span className="ml-2 text-blue-400">{order.isDelivered ? "Yes" : "No"}</span></p>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <FiDollarSign className="text-[15px] text-amber-400" />
                        <p>Total: <span className="text-amber-400 ml-2 font-bold">${order.totalPrice}</span></p>
                      </div>
                    </div>

                    {/* Shipping Info */}
                    {order.shippingData && (
                      <div className="bg-[#2a2a2a] p-4 rounded-xl space-y-2">
                        <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3">
                          Shipping Info
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <FiUser className="text-[14px] text-gray-400 shrink-0" />
                          <span>{order.shippingData.fullName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <FiPhone className="text-[14px] text-gray-400 shrink-0" />
                          <span>{order.shippingData.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <FiMapPin className="text-[14px] text-gray-400 shrink-0" />
                          <span>{order.shippingData.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <FiMapPin className="text-[14px] text-gray-400 shrink-0" />
                          <span>{order.shippingData.city}</span>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              ))
            )}
          </div>
        </div>

        {/* Users */}
<div className="bg-[#1a1a1a] rounded-3xl p-8 mt-8">
  <h2 className="text-3xl mb-8 font-serif">Users</h2>

  <div className="space-y-4">
    {users.length === 0 ? (
      <p className="text-gray-400">No users yet.</p>
    ) : (
      users.map((user) => (
        <div key={user._id} className="bg-[#222] p-5 rounded-2xl flex items-center justify-between flex-wrap gap-4">
          
          <div className="flex items-center gap-4">
            <div className="bg-[#2a2a2a] p-3 rounded-xl">
              <FiUser className="text-[20px] text-gray-400" />
            </div>
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>
          </div>

          <span
            className={`px-4 py-1 rounded-full text-sm font-semibold ${
              user.isAdmin
                ? "bg-amber-500/20 text-amber-400"
                : "bg-blue-500/20 text-blue-400"
            }`}
          >
            {user.isAdmin ? "Admin" : "User"}
          </span>

          {!user.isAdmin && (
  <button
    onClick={() => handleDeleteUser(user._id)}
    className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 transition text-red-400 px-4 py-2 rounded-xl text-sm font-semibold"
  >
    <FiTrash2 className="text-[14px]" />
    Delete
  </button>
)}

        </div>
      ))
    )}
  </div>
</div>

      </div>
    </div>
  );
};

export default AdminDashboard;