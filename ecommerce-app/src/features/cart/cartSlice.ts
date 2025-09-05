import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface CartItem {
  id: number;       
  productId: number; 
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
}

const initialState: CartState = {
  items: [],
  loading: false,
};

const API_URL = "http://localhost:5000/cart";

export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const res = await axios.get<CartItem[]>(API_URL);
  return res.data;
});

export const addToCart = createAsyncThunk(
  "cart/add",
  async (product: { id: number; title: string; price: number; image: string }) => {
    const res = await axios.post<CartItem>(API_URL, {
      productId: product.id, 
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    return res.data;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default cartSlice.reducer;
