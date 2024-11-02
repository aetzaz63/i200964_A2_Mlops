require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();


app.use(cors({
    origin: 'http://localhost:5000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


app.use(express.json()); 


app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT; 
app.listen(PORT, () => {
    console.log(`Authentication Service running on port ${PORT}`);
});
