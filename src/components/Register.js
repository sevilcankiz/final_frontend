import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const isPasswordValid = (password) => {
        const passwordCheck = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@$%?])[A-Za-z\d!@$%?]{8,}$/;
        return passwordCheck.test(password);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!formData.email.includes('@yourjournal')) {
            setError('Bitte verwenden Sie eine gültige firmeneigene E-Mail-Adresse (@yourjournal).');
            return;
        }
        if (!isPasswordValid(formData.password)) {
            setError(
                'Das Passwort muss mindestens 8 Zeichen lang sein, einen Großbuchstaben, eine Zahl und ein Sonderzeichen (!@$%?) enthalten.'
            );
            return;
        }

        try {
            const response = await fetch('http://172.20.79.15/sentuerk_final/final_backend/api.php/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message || 'Registrierung erfolgreich!');
            } else {
                setError(data.error || 'Ein Fehler ist aufgetreten.');
            }
        } catch (err) {
            setError('Netzwerkfehler: ' + err.message);
        }
    };

    return (
        <div>
            <h1>Registrierung</h1>
            <p>Bitte mit der firmeneigenen E-Mail-Adresse (@yourjournal) Registrieren</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Benutzername:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">E-Mail:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Passwort:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Registrieren</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Register;
