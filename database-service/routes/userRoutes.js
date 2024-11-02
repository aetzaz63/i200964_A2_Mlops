const express = require('express');
const { createUser, getUserByEmail, updateUser, resetPassword, getUserByToken  } = require('../controllers/userController');
const router = express.Router();

router.post('/users', createUser);
router.get('/users', getUserByEmail); 
router.put('/users/:id', updateUser);
router.put('/users/reset-password', resetPassword);
router.get('/users/token', getUserByToken);


module.exports = router;
