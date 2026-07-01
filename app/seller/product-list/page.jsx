'use client'
import React, { useEffect, useState } from "react";
import { assets, productsDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import { ProductTableSkeleton } from "@/components/Fallback";
import toast from "react-hot-toast";
import axios from "axios";

const ProductList = () => {

  const { router, getToken, user, fetchProductData } = useAppContext()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const fetchSellerProduct = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get("/api/product/seller-list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setProducts(data.products);
        setLoading(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleStatusChange = async (productId, newStatus) => {
    try {
      const token = await getToken();
      const { data } = await axios.put(
        "/api/product/update",
        { productId, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setProducts((prev) => prev.map((p) => (p._id === productId ? { ...p, status: newStatus } : p)));
        await fetchProductData();
        toast.success(data.message || "Product updated");
      } else {
        toast.error(data.message || "Failed to update product");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update product");
    }
  }

  const openDeleteConfirm = (product) => {
    setSelectedProduct(product)
    setConfirmOpen(true)
  }

  const closeDeleteConfirm = () => {
    setConfirmOpen(false)
    setSelectedProduct(null)
  }

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      const token = await getToken();
      setDeletingId(selectedProduct._id);
      setConfirmOpen(false);

      const { data } = await axios.delete("/api/product/delete", {
        data: { productId: selectedProduct._id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== selectedProduct._id));
        toast.success(data.message || "Product deleted successfully");
      } else {
        toast.error(data.message || "Failed to delete product");
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete product");
    } finally {
      setDeletingId(null);
      setSelectedProduct(null);
    }
  };

  useEffect(() => {

    if (user) {
      fetchSellerProduct();

    }
  }, [user])

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      {loading ? <ProductTableSkeleton rows={6} /> : <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Product</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <div className="w-full overflow-x-auto md:hidden p-4">
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product._id} className="bg-gray-50 rounded-xl border border-gray-200 p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-500/10 rounded p-2">
                      <Image
                        src={product.image[0]}
                        alt="product Image"
                        className="w-16 h-16 object-cover rounded"
                        width={1280}
                        height={720}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-medium text-gray-900 truncate">{product.name}</h3>
                      <p className="text-sm text-gray-500 truncate">{product.category}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-400">Price</p>
                      <p className="font-medium text-gray-900">SDG {product.offerPrice}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-400">Status</p>
                      <div className="font-medium text-gray-900">
                        <select
                          className="w-full max-w-[260px] outline-none rounded border border-gray-300 text-sm px-2 py-1"
                          value={product.status || 'available'}
                          onChange={(e) => handleStatusChange(product._id, e.target.value)}
                        >
                          <option value="available">Available</option>
                          <option value="coming_soon">Coming Soon</option>
                          <option value="out_of_stock">Out of Stock</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button onClick={() => router.push(`/product/${product._id}`)} className="flex-1 min-w-[120px] justify-center inline-flex items-center gap-1 px-3 py-2 bg-orange-600 text-white dark:text-white rounded-md">
                      <span className="text-white dark:text-white">Visit</span>
                    </button>
                    <button
                      onClick={() => openDeleteConfirm(product)}
                      disabled={deletingId === product._id}
                      className="flex-1 min-w-[120px] justify-center inline-flex items-center px-3 py-2 bg-red-600 text-white dark:text-white rounded-md disabled:opacity-60"
                    >
                      <span className="text-white dark:text-white">
                        {deletingId === product._id ? "Deleting..." : "Delete"}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block w-full overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="text-gray-900 text-sm text-left">
                <tr>
                  <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium truncate">Product</th>
                  <th className="px-4 py-3 font-medium truncate">Category</th>
                  <th className="px-4 py-3 font-medium truncate">Price</th>
                  <th className="px-4 py-3 font-medium truncate">Status</th>
                  <th className="px-4 py-3 font-medium truncate">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-500">
                {products.map((product) => (
                  <tr key={product._id} className="border-t border-gray-500/20">
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                      <div className="bg-gray-500/10 rounded p-2">
                        <Image
                          src={product.image[0]}
                          alt="product Image"
                          className="w-16 h-16 object-cover rounded"
                          width={1280}
                          height={720}
                        />
                      </div>
                      <span className="truncate w-full">{product.name}</span>
                    </td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3">SDG {product.offerPrice}</td>
                    <td className="px-4 py-3">
                      <select
                        className="outline-none rounded border border-gray-300 text-sm px-2 py-1"
                        value={product.status || 'available'}
                        onChange={(e) => handleStatusChange(product._id, e.target.value)}
                      >
                        <option value="available">Available</option>
                        <option value="coming_soon">Coming Soon</option>
                        <option value="out_of_stock">Out of Stock</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <button onClick={() => router.push(`/product/${product._id}`)} className="flex items-center gap-1 px-1.5 md:px-3.5 py-2 bg-orange-600 text-white dark:text-white rounded-md">
                          <span className="hidden md:block text-white dark:text-white">Visit</span>
                          <Image className="h-3.5" src={assets.redirect_icon} alt="redirect_icon" />
                        </button>
                        <button
                          onClick={() => openDeleteConfirm(product)}
                          disabled={deletingId === product._id}
                          className="px-3 py-2 bg-red-600 text-white dark:text-white rounded-md disabled:opacity-60"
                        >
                          <span className="text-white dark:text-white">
                            {deletingId === product._id ? "Deleting..." : "Delete"}
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>}

      {confirmOpen && selectedProduct ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-black/10">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Delete product?</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Are you sure you want to remove <span className="font-medium text-gray-900">{selectedProduct.name}</span> from your store? This action cannot be undone.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDeleteConfirm}
                className="inline-flex justify-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteProduct}
                disabled={deletingId === selectedProduct._id}
                className="inline-flex justify-center rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletingId === selectedProduct._id ? "Deleting..." : "Delete product"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <Footer />
    </div>
  );
};

export default ProductList;