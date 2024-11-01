require('dotenv').config();
const express = require('express');
const gatewayRoutes = require('./routes/gatewayRoutes');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());
// Use the custom routes for proxying requests
app.use(gatewayRoutes);

// Start the API Gateway server
app.listen(process.env.PORT, () => {
    console.log(`API Gateway running on port ${process.env.PORT}`);
});
