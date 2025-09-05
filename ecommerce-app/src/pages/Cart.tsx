import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCart, removeFromCart } from "../features/cart/cartSlice";
import type { AppDispatch, RootState } from "../app/store";

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        🛒 Giỏ hàng
      </h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          Chưa có sản phẩm trong giỏ hàng
        </p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-600">Số lượng: {item.quantity}</p>
              </div>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                ❌ Xóa
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
