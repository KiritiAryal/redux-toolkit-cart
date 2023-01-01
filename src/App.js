import React from "react";
// components
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
// items

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotal, getItems } from "./features/cart/cartSlice";
import Modal from "./components/Modal";

function App() {
  const { cart, isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
