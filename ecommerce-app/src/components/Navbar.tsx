import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";


export default function Navbar() {
  const cartCount = useSelector((state: RootState) => state.cart.items.length);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-white hover:text-yellow-300 transition-colors"
        >
          🛒 Shop
        </Link>

        <div className="flex space-x-6">
          <Link
            to="/"
            className="text-white font-medium hover:text-yellow-300 transition-colors"
          >
            Trang chủ
          </Link>
          <Link
            to="/cart"
            className="relative text-white font-medium hover:text-yellow-300 transition-colors"
          >
            Giỏ hàng
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-xs rounded-full px-2 py-0.5 font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        
      </div>
    </nav>
  );
}
