const express = require('express');
const axios = require('axios');

const router = express.Router();
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
const DB_SERVICE_URL = process.env.DB_SERVICE_URL;

// Route for authentication actions (signup, login, forgot password, reset password)
router.post('/auth/:action', async (req, res) => {
    const { action } = req.params;
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/auth/${action}`, req.body);
      //  console.log(`Forwarded ${action} request to Authentication Service`);
        res.status(response.status).json({ data: response.data });
    } catch (error) {
      //  console.error(`Error in forwarding ${action} request to Authentication Service:`, error.message);
        res.status(error.response?.status || 500).send(error.response?.data || 'Error in Authentication Service');
    }
});


// Example for database service route (optional if not directly accessed)
router.post('/db/:action', async (req, res) => {
    const { action } = req.params;
    try {
        const response = await axios.post(`${DB_SERVICE_URL}/${action}`, req.body);
       // console.log(`Forwarded ${action} request to Database Service`);
        res.status(response.status).json(response.data);
    } catch (error) {
      //  console.error(`Error in forwarding ${action} request to Database Service:`, error.message);
        res.status(error.response?.status || 500).send(error.response?.data || 'Error in Database Service');
    }
});

module.exports = router;
