// components/Signup.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../api';
import './styles.css';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            await signup({ email, password });
            setEmail('');
            setPassword('');
            setMessage('User registered successfully!');
        } catch (error) {
            setMessage('Failed to register');
        }
    };
    
    return (
        <div className="container">
            <h2>Signup</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Signup</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
            <p>Forgot your password? <Link to="/forgot-password">Reset Password</Link></p>
        </div>
    );
}

export default Signup;
