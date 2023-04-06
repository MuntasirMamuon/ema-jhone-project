import React, { useState } from "react";
import Cart from "../Cart/Cart";
import { useLoaderData } from "react-router-dom";
import ReviewItem from "../RviewItem/ReviewItem";
import "./Orders.css";
import { faRemoveFormat } from "@fortawesome/free-solid-svg-icons";
import { removeFromDb } from "../../utilities/fakedb";
const Orders = () => {
  const savedCart = useLoaderData();

  const [cart, setCart] = useState(savedCart);
  const handleRemoveFromCart = (id) => {
    const remaining = cart.filter((product) => product.id !== id);
    setCart(remaining);
    removeFromDb(id);
  };

  return (
    <div className="shop-container">
      <div className="review-container">
        {cart.map((pd) => (
          <ReviewItem
            key={pd.id}
            product={pd}
            handleRemoveFromCart={handleRemoveFromCart}
          ></ReviewItem>
        ))}
      </div>
      <div className="card-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Orders;
