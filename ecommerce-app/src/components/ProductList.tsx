import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import { addToCart } from "../features/cart/cartSlice";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "../app/store";

export default function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading)
    return <p className="text-center text-lg font-medium py-6">⏳ Đang tải...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Danh sách sản phẩm</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((product) => (
          <div
            key={product.id}
            className="border rounded-2xl shadow hover:shadow-lg transition bg-white flex flex-col"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-48 w-full object-contain p-4"
            />

            <div className="flex-1 px-4 py-2 flex flex-col justify-between">
              <h3 className="font-semibold text-gray-800 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-lg font-bold text-blue-600 mt-2">
                {product.price} VNĐ
              </p>

              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mt-4 rounded-lg transition-colors"
                onClick={() => dispatch(addToCart(product))}
              >
                ➕ Thêm vào giỏ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
