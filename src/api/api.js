const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// GET TOKEN
export const getUser = () => {
  return JSON.parse(sessionStorage.getItem("quickbiteUser"));
};

export const signin = async (data) => {
  const res = await fetch(`${API}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const signup = async (data) => {
  const res = await fetch(`${API}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const createOrder = async (order) => {
  const user = getUser();

  console.log("user:", user);

  const res = await fetch(`${API}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(order),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create order"); // 👈 this is what was missing
  }

  return data;
};

export const getOrders = async () => {
  const user = getUser();

  const res = await fetch(`${API}/orders`, {  // ✅ changed from /orders/myorders
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);  // ✅ add error handling

  return data;
};

export const getMyOrders = async () => {
  const user = getUser();

  const res = await fetch(`${API}/orders/myorders`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const getUsers = async () => {
  const user = getUser();

  const res = await fetch(`${API}/users`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const updateOrder = async (id, data) => {
  const user = getUser();

  const res = await fetch(`${API}/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getProducts = async () => {
  const res = await fetch(
    `${API}/products`
  );

  return res.json();
};

export const createProduct = async (data) => {
  const user = getUser();

  const res = await fetch(
    `${API}/products`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",

        Authorization: `Bearer ${user.token}`,
      },

      body: JSON.stringify(data),
    }
  );

  return res.json();
};

export const updateProduct = async (
  id,
  data
) => {
  const user = getUser();

  const res = await fetch(
    `${API}/products/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type":
          "application/json",

        Authorization: `Bearer ${user.token}`,
      },

      body: JSON.stringify(data),
    }
  );

  return res.json();
};

export const deleteProduct = async (id) => {
  const user = getUser();

  const res = await fetch(
    `${API}/products/${id}`,
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );

  return res.json();
};

export const rateProduct = async (id, value) => {
  const user = getUser();
  console.log("user:", user);           // is user null?
  console.log("product id:", id);       // is id undefined?

  const res = await fetch(`${API}/products/${id}/rate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({ value }),
  });

  const data = await res.json();
  console.log("raw response:", data);   // what does server actually return?
  return data;
};

export const deleteUser = async (id) => {
  const user = getUser();

  const res = await fetch(`${API}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};