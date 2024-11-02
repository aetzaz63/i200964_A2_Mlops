const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

const DB_SERVICE_URL = process.env.DB_SERVICE_URL;

// Signup function
const signup = async (req, res) => {
    const { email, password } = req.body;
    
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Send request to Database Service to create the user
        const response = await axios.post(`${DB_SERVICE_URL}/users`, { email, password: hashedPassword });

        // Return success response
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        // Check if the error is due to duplicate email (already registered user)
        if (error.response && error.response.status === 409) {
            return res.status(409).json({ message: 'User with this email already exists.' });
        }

        // Handle other errors
        res.status(400).json({ message: 'Error registering user' });
    }
};


// Login function
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { data: user } = await axios.get(`${DB_SERVICE_URL}/users?email=${email}`);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Login error' });
    }
};

// Forgot Password function
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const { data: user } = await axios.get(`${DB_SERVICE_URL}/users?email=${email}`);
        if (!user) return res.status(400).json({ message: 'User not found' });

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1-hour expiry

        await axios.put(`${DB_SERVICE_URL}/users/${user._id}`, { resetToken, resetTokenExpiry });

        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
        await sendEmail(email, 'Password Reset', `Click here to reset your password: ${resetLink}`);
        res.status(200).json({ message: 'Password reset link sent' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending reset link' });
    }
};

// Reset Password function
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;


    try {
        // Fetch user by reset token
        const { data: user } = await axios.get(`${DB_SERVICE_URL}/users/token`, { params: { resetToken: token } });

        // Check if user exists and token is valid and not expired
        if (!user) {
            console.error("User not found or token invalid");
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        if (user.resetTokenExpiry < Date.now()) {
            console.error("Token expired for user:", user.email);
            return res.status(400).json({ message: 'Expired token' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user’s password, clear reset token and expiry
        await axios.put(`${DB_SERVICE_URL}/users/${user._id}`, {
            password: hashedPassword
        //    resetToken: null,
         //   resetTokenExpiry: null
        });

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error("Error resetting password:", error.message);
        // Handle axios specific errors
        if (error.response) {
            console.error("Error response:", error.response.data); // More detailed logging
            res.status(error.response.status).json({ message: error.response.data.message });
        } else {
            res.status(500).json({ message: 'Error resetting password' });
        }
    }
};




module.exports = { signup, login, forgotPassword, resetPassword };
