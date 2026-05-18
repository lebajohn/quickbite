import { useState } from "react";

import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/api";

const AdminProducts = ({
  products,
  setProducts,
  setCurrentPage,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    category: "",
    description: "",
    price: "",
  });

  const [editingId, setEditingId] =
    useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        const updated =
          await updateProduct(
            editingId,
            formData
          );

        setProducts(
          products.map((p) =>
            p._id === editingId
              ? updated
              : p
          )
        );

        setEditingId(null);
      } else {
        const created =
          await createProduct(formData);

        setProducts([
          created,
          ...products,
        ]);
      }

      setFormData({
        name: "",
        image: "",
        category: "",
        description: "",
        price: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editProduct = (product) => {
    setEditingId(product._id);

    setFormData({
      name: product.name,
      image: product.image,
      category: product.category,
      description:
        product.description,
      price: product.price,
    });
  };

  const removeProduct = async (id) => {
    await deleteProduct(id);

    setProducts(
      products.filter(
        (p) => p._id !== id
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#111] text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-serif">
            Manage Products
          </h1>

          <button
            onClick={() =>
              setCurrentPage("admin")
            }
            className="bg-amber-500 text-black px-5 py-3 rounded-xl"
          >
            Back
          </button>
        </div>

        <form
          onSubmit={submitHandler}
          className="grid md:grid-cols-2 gap-5 mb-12"
        >
          <input
            type="text"
            placeholder="Name"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="bg-[#222] p-4 rounded-xl"
          />

         <div className="flex flex-col gap-3">
  <input
    type="file"
    accept="image/*"
    required={!editingId}
    onChange={(e) => {
      const file = e.target.files[0];

      if (!file) return;

      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }}
    className="bg-[#222] p-4 rounded-xl"
  />

  {formData.image && (
    <img
      src={formData.image}
      alt="Preview"
      className="w-32 h-32 object-cover rounded-xl"
    />
  )}
</div>

          <input
            type="text"
            placeholder="Category"
            required
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
              })
            }
            className="bg-[#222] p-4 rounded-xl"
          />

          <input
            type="number"
            placeholder="Price"
            required
            value={formData.price}
            onChange={(e) =>
              setFormData({
                ...formData,
                price: e.target.value,
              })
            }
            className="bg-[#222] p-4 rounded-xl"
          />

          <textarea
            placeholder="Description"
            required
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description:
                  e.target.value,
              })
            }
            className="bg-[#222] p-4 rounded-xl md:col-span-2"
          />

          <button
            type="submit"
            className="bg-amber-500 text-black py-4 rounded-xl font-bold md:col-span-2"
          >
            {editingId
              ? "Update Product"
              : "Add Product"}
          </button>
        </form>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-[#1a1a1a] rounded-3xl overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-52 object-cover"
              />

              <div className="p-5">
                <h2 className="text-2xl font-bold mb-2">
                  {product.name}
                </h2>

                <p className="text-amber-400 mb-2">
                  ${product.price}
                </p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() =>
                      editProduct(product)
                    }
                    className="bg-blue-500 px-4 py-2 rounded-xl text-black"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      removeProduct(
                        product._id
                      )
                    }
                    className="bg-red-500 px-4 py-2 rounded-xl text-black"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminProducts;