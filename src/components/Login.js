import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({isLoggedIn, setIsLoggedIn, setUser}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://172.20.79.15/sentuerk_final/final_backend/api.php/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(`Willkommen, ${data.user.first_name} ${data.user.last_name}. Sie sind eingeloggt und werden zu den Produkten weitergeleitet.`);
                setIsLoggedIn(true);
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                setTimeout(() => {
                    navigate('/products');
                }, 4000);
            } else {
                setMessage(data.error || 'Login fehlgeschlagen.');
            }
        } catch (error) {
            console.error('Login Error:', error);
            setMessage('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">E-Mail:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Passwort:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
