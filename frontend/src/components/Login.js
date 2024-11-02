// components/Login.js
import React, { useState } from 'react';
import { login } from '../api';
import { useNavigate, Link } from 'react-router-dom'; // Added Link import
import './styles.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            await login({ email, password });
            setEmail('');
            setPassword('');
            navigate('/welcome');
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
                <button type="submit">Login</button>
                <p><Link to="/forgot-password">Forgot Password?</Link></p>
            </form>
        </div>
    );
}

export default Login;
