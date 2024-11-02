// components/ForgotPassword.js
import React, { useState } from 'react';
import { forgotPassword } from '../api';
import './styles.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await forgotPassword({ email });
            setMessage(response.data.message);
            setEmail('');
        } catch (error) {
            setMessage('Failed to send reset link. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2>Forgot Password</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Send Reset Link</button>
            </form>
        </div>
    );
}

export default ForgotPassword;
