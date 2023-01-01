import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://course-api.com/react-useReducer-cart-project";
export const getItems = createAsyncThunk(
  "cart/fetchItems",
  async (_, thunkApi) => {
    try {
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);
const initialState = {
  cart: [],
  total_items: 0,
  total_price: 0,
  isLoading: false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.cart = [];
    },
    toggleAmount(state, { payload }) {
      const { id, type } = payload;
      if (type === "increase") {
        const item = state.cart.find((item) => item.id === id);
        item.amount += 1;
      } else if (type === "decrease") {
        const item = state.cart.find((item) => item.id === id);
        item.amount -= 1;
      }
    },
    remove(state, { payload }) {
      state.cart = state.cart.filter((item) => item.id !== payload);
    },
    getTotal(state) {
      let temp_items = 0;
      let temp_price = 0;

      state.cart.forEach((item) => {
        temp_items += item.amount;
        temp_price += item.price * item.amount;
      });
      state.total_items = temp_items;
      state.total_price = temp_price;
    },
  },
  extraReducers: {
    [getItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
    },
    [getItems.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
    },
  },
});

export const { clearCart, toggleAmount, remove, getTotal } = cartSlice.actions;
export default cartSlice.reducer;
