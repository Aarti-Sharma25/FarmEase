// src/ProductPage.js
import React from 'react';
import { useProducts } from './ProductContext';

const ProductPage = () => {
  const { products } = useProducts(); // Access products from context

  return (
    <div className="product-page">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p>Company: {product.company}</p>
            <p>Price: ${product.price}</p>
            <p>Selling Price: ${product.sellingPrice}</p>
            <p>Contact: {product.contactInfo}</p>
            {product.image && (
              <img
                src={URL.createObjectURL(product.image)}
                alt={product.name}
                className="mt-2 w-full h-auto"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
