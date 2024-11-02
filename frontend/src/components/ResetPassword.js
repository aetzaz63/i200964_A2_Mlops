// components/ResetPassword.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../api';
import './styles.css';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = new URLSearchParams(location.search).get('token');

        if (newPassword.length < 8) {
            setMessage('Password must be at least 8 characters long.');
            return;
        }

        try {
            const response = await resetPassword({ token, newPassword });
            setMessage(response.data.message);
            setNewPassword('');
            navigate('/login');
        } catch (error) {
            setMessage('Failed to reset password. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <label>New Password</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ResetPassword;
