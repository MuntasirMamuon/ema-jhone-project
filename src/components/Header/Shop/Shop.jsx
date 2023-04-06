import React, { useEffect, useState } from "react";
import { addToDb, getShoppingCart } from "../../../utilities/fakedb";
import Cart from "../../Cart/Cart";
import Product from "../../Product/Product";
import product from "../../Product/Product";
import "./Shop.css";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch("../../../../public/fakeData/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    // console.log(products);
    const storedCart = getShoppingCart();
    const savedCart = [];
    // step nno 1 get id
    for (const id in storedCart) {
      // step no 2 get the product by using id
      const addedProduct = products.find((product) => product.id === id);
      if (addedProduct) {
        //  setp no 3 get quantity of the product
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        // step no 4 add the added product to the saved cart 
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
  }, [products]);

  const handleAddToCart = (product) => {
    let newCart  = [];
    const exists=cart.find(pd => pd.id === product.id);
    if(!exists){
      product.quantity=1;
      newCart=[...cart,product]
    }
    else{
      exists.quantity=exists.quantity+1;
      const remaning=cart.filter(pd =>  pd.id  !== product.id)
      newCart==[...remaning,exists];
    }
    // const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product.id);
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
