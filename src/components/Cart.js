import React, { useState, useEffect, useCallback } from 'react';

const Cart = ({ userId }) => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState('');

    const fetchCart = useCallback(async () => {
        const currentUserId = userId || JSON.parse(localStorage.getItem('user'))?.id;

        if (!currentUserId) {
            setError('Benutzer nicht eingeloggt.');
            return;
        }

        try {
            const response = await fetch(`http://172.20.79.15/sentuerk_final/final_backend/api.php/cart?user_id=${currentUserId}`);
            const data = await response.json();
            if (response.ok) {
                setCartItems(data);
            } else {
                setError(data.error || 'Fehler beim Abrufen des Warenkorbs');
            }
        } catch (err) {
            setError('Fehler beim Abrufen des Warenkorbs');
        }
    }, [userId]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return;

        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
        updateQuantityInBackend(productId, newQuantity);
    };

    const updateQuantityInBackend = async (productId, quantity) => {
        try {
            const response = await fetch('http://172.20.79.15/sentuerk_final/final_backend/api.php/cart/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId, product_id: productId, quantity }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || 'Fehler beim Synchronisieren mit dem Backend');
            }
        } catch {
            setError('Fehler beim Ändern der Menge');
        }
    };

    return (
        <div>
            <h2>Warenkorb</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.price}€ 
                        <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                            min="1"
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;


