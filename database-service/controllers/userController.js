const User = require('../models/User');
const bcrypt = require('bcryptjs');


// Create a new user
const createUser = async (req, res) => {
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists.' });
        }

        // If user doesn't exist, create and save the new user
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
};


// Get user by email
const getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.query.email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
};

// Update user data (for password reset)
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
};


// Reset password with token verification
const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // Find the user by the reset token and check if the token is still valid
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token.' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password and clear the reset token and expiry
        user.password = hashedPassword;
       // user.resetToken = null;
       // user.resetTokenExpiry = null;

        await user.save();
        res.status(200).json({ message: 'Password reset successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password', error });
    }
};


// Get user by reset token
const getUserByToken = async (req, res) => {
    try {
        const user = await User.findOne({ resetToken: req.query.resetToken });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user by token' });
    }
};


module.exports = { createUser, getUserByEmail, updateUser, resetPassword, getUserByToken };
