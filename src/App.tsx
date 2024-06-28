import React, { useState } from "react";
import "./App.css";
import { juhuu } from "./juhuuClass";

function App() {
  const [products, setProducts] = useState<any[]>([]);
  const [product, setProduct] = useState<any>(null);
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  const handleFetchProducts = async () => {
    const response = await juhuu.listProducts({});
    if (response.ok) {
      setProducts(response.data);
      console.log(response.data);
    }
  };

  const handleFetchProduct = async (id: string) => {
    const response = await juhuu.getProduct(id);
    if (response.ok) {
      setProduct(response.data);
      console.log(response.data);
    } else {
      console.error(`Failed to fetch product with id ${id}: ${response.error}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleFetchProducts}>
          Fetch Products (check the console logs)
        </button>
        <button
          onClick={() => {
            if (selectedProductId) {
              handleFetchProduct(selectedProductId);
            } else {
              console.error("Please select a product ID first.");
            }
          }}
        >
          Fetch Single Product (check the console logs)
        </button>
        <a
          href="https://identity.juhuu.app/auth?refUrl=localhost:3000"
          target="_blank"
          rel="noreferrer"
        >
          Login or Signup using JUHUU Identity
        </a>
        <div>
          {/* <h2>Products</h2> */}
          {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
        </div>
        <div>
          {/* <h2>Product</h2> */}
          {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}
        </div>
        <div>
          <h2>Select a Product ID</h2>
          <select
            onChange={(e) => setSelectedProductId(e.target.value)}
            value={selectedProductId}
          >
            <option value="fixed-dropdown" disabled>
              Select a product
            </option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
      </header>
    </div>
  );
}

export default App;
