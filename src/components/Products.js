import React, { useEffect, useState } from 'react';

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://172.20.79.15/sentuerk_final/final_backend/api.php/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der Produkte");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) {
    return <div>Fehler: {error}</div>;
  }

  return (
    <div>
      <h1>Produkte</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Preis: {product.price} €</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
