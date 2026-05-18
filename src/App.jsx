import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import FoodGrid from "./components/FoodGrid";
import FoodDetail from "./components/FoodDetail";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import foodData from "./data/foodData";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ErrorPage from "./components/ErrorPage";
import ShippingPage from "./components/ShippingPage";
import PaymentPage from "./components/PaymentPage";
import OrdersPage from './components/OrdersPage';
import AdminDashboard from "./components/AdminDashboard";
import AdminProducts from "./components/AdminProducts";
import { getOrders, getMyOrders, getProducts, getUsers, createOrder } from "./api/api";
import { useEffect } from "react";

const App = () => {
  const [cart, setCart] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showCart, setShowCart] = useState(false);
  const [userRatings, setUserRatings] = useState({});
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  // ✅ FIXED AUTH BLOCK (CORRECT)
  const savedUser = JSON.parse(
    sessionStorage.getItem("quickbiteUser")
  );

  const [isLoggedIn, setIsLoggedIn] = useState(!!savedUser);
  const [isAdmin, setIsAdmin] = useState(savedUser?.isAdmin || false);

  const [currentPage, setCurrentPage] = useState("home");
  const [authError, setAuthError] = useState("");

  const [shippingData, setShippingData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const [orders, setOrders] = useState([]);

useEffect(() => {
  const loadOrders = async () => {
    try {
      const data = isAdmin ? await getOrders() : await getMyOrders();
      setOrders(data);

      if (isAdmin) {
        const userData = await getUsers();
        setUsers(userData);
      }

    } catch (error) {
      console.log(error);
    }
  };

  if (isLoggedIn) {
    loadOrders();
  }
}, [isLoggedIn]);

const [pendingCheckout, setPendingCheckout] =
  useState(false);


  const filteredFoods =
    activeCategory === "All"
      ? foodData
      : foodData.filter(
          (food) => food.category === activeCategory
        );

        useEffect(() => {
  const loadProducts = async () => {
    const data = await getProducts();

    setProducts(data);
  };

  loadProducts();
}, []);

  const addToCart = (food, quantity) => {
    const existing = cart.find((item) => item.id === food.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === food.id
            ? {
                ...item,
                quantity: item.quantity + quantity
              }
            : item
        )
      );
    } else {
      setCart([...cart, { ...food, quantity }]);
    }

    setShowCart(true);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
  setCart(
    cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

const decreaseQuantity = (id) => {
  setCart(
    cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Math.max(1, item.quantity - 1),
          }
        : item
    )
  );
};

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  
  const handleCheckout = () => {
  if (!isLoggedIn) {
    setPendingCheckout(true);

    setCurrentPage("signin");

    setShowCart(false);

    return;
  }

  setShowCart(false);

  setCurrentPage("shipping");
};

const placeOrder = async () => {
  try {
    const orderData = {
      orderItems: cart,
      paymentMethod,
      shippingData,

      totalPrice: cart.reduce(
        (acc, item) =>
          acc + item.price * item.quantity,
        0
      ),

      isPaid: paymentMethod === "M-Pesa",
    };

    const newOrder = await createOrder(orderData);

    setOrders([newOrder, ...orders]);
     setCurrentPage("orders");

    setCart([]);

  } catch (error) {
    console.log("Order failed:", error);
    alert("Failed to place order: " + error.message);
  }
};


if (currentPage === "signin") {
  return (
    <SignIn
      setIsLoggedIn={setIsLoggedIn}
      setCurrentPage={setCurrentPage}
      setAuthError={setAuthError}
      pendingCheckout={pendingCheckout}
      setPendingCheckout={setPendingCheckout}
      setIsAdmin={setIsAdmin}
    />
  );
}

if (currentPage === "signup") {
  return (
    <SignUp
      setIsLoggedIn={setIsLoggedIn}
      setCurrentPage={setCurrentPage}
      setAuthError={setAuthError}
    />
  );
}

if (currentPage === "error") {
  return (
    <ErrorPage
      errorMessage={authError}
      goBack={() => setCurrentPage("signin")}
    />
  );
}

if (currentPage === "shipping") {
  return (
    <ShippingPage
      shippingData={shippingData}
      setShippingData={setShippingData}
      setCurrentPage={setCurrentPage}
    />
  );
}

if (currentPage === "payment") {
  return (
    <PaymentPage
      paymentMethod={paymentMethod}
      setPaymentMethod={setPaymentMethod}
      placeOrder={placeOrder}
    />
  );
}

if (currentPage === "orders") {
  return (
    <OrdersPage
      orders={orders}
      setCurrentPage={setCurrentPage}
    />
  );
}

if (currentPage === "admin-products") {
  return (
    <AdminProducts
      products={products}
      setProducts={setProducts}
      setCurrentPage={setCurrentPage}
    />
  );
}

if (currentPage === "admin") {

  if (!isAdmin) {
    return (
      <ErrorPage
        errorMessage="Access Denied"
        goBack={() => setCurrentPage("home")}
      />
    );
  }

  return (
    <AdminDashboard
      orders={orders}
      setOrders={setOrders}
      users={users}
      setUsers={setUsers}
      setCurrentPage={setCurrentPage}
    />
  );
}

  return (
    <div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700;800&display=swap');
        `}
      </style>

     <Navbar
  cartCount={totalItems}
  openCart={() => setShowCart(true)}
  isLoggedIn={isLoggedIn}
  openSignIn={() => setCurrentPage("signin")}
  isAdmin={isAdmin}
  openAdmin={() => setCurrentPage("admin")}
  openOrders={() => setCurrentPage("orders")} 
  logout={() => {
  sessionStorage.removeItem("quickbiteUser");

  setIsLoggedIn(false);
  setIsAdmin(false);

  setOrders([]);

  setCurrentPage("home");
}}
  
/>

      {selectedFood ? (
        <FoodDetail
          food={selectedFood}
          addToCart={addToCart}
          backToMenu={() => setSelectedFood(null)}
          userRatings={userRatings}
          setUserRatings={setUserRatings}
          isLoggedIn={isLoggedIn}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <>
          <Hero />

          <Categories
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
       
       <FoodGrid
  foods={
    activeCategory === "All"
      ? products
      : products.filter(
          (food) =>
            food.category.toLowerCase() === activeCategory.toLowerCase()
        )
  }
  openDetails={setSelectedFood}
/>

          <Footer />
        </>
      )}

      {showCart && (
        <CartDrawer
          cart={cart}
  closeCart={() => setShowCart(false)}
  removeFromCart={removeFromCart}
  increaseQuantity={increaseQuantity}
  decreaseQuantity={decreaseQuantity}
  handleCheckout={handleCheckout}
        />
      )}

      
    </div>
  );
};

export default App;