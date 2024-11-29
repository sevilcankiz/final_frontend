import React, { useEffect, useState } from 'react';

function Products({ userId }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const userIdFromStorage = localStorage.getItem('user_id');

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

  const addToCart = async (productId) => {
    const currentUserId = userId || userIdFromStorage;
    
    if (!currentUserId) {
      setMessage('Bitte loggen Sie sich ein, um Artikel in den Warenkorb zu legen.');
      return;
    }

    try {
      const response = await fetch("http://172.20.79.15/sentuerk_final/final_backend/api.php/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: currentUserId,
          product_id: productId,
          quantity: 1, 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Artikel wurde dem Warenkorb hinzugefügt.');
      } else {
        setMessage(data.error || 'Fehler beim Hinzufügen zum Warenkorb.');
      }
    } catch (err) {
      setMessage('Netzwerkfehler: ' + err.message);
    }
  };

  if (error) {
    return <div>Fehler: {error}</div>;
  }

  return (
    <div>
      <h1>Produkte</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Preis: {product.price} €</p>
            <button onClick={() => addToCart(product.id)}>In den Warenkorb</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;

