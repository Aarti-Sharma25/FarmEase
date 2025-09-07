// src/ProductContext.js
import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const useProducts = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { ...product, id: Date.now() }, // Give each product a unique ID
    ]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
