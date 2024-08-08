// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const { connectDB } = require('../config/db');
// const purchaseRoutes = require('../routes/PurchaseRoutes');
// const tableRoute = require('../routes/tableRoute');
// const foodItemRoutes = require('../routes/foodItem');

// const path = require('path');

// // Load environment variables from .env file
// dotenv.config();

// // Connect to the database
// connectDB();

// const app = express();
// const port = process.env.PORT || 5000;
// const hostname = process.env.HOSTNAME || 'localhost';

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());

// // Static file serving
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Routes
// app.use('/api', purchaseRoutes);
// app.use('/api/tables', tableRoute);
// app.use('/api', foodItemRoutes);

// // Catch-all route to handle undefined routes
// app.use((req, res) => {
//     res.status(404).json({ error: 'Not Found' });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ error: 'Internal Server Error' });
// });

// // Start the server
// app.listen(port, hostname, () => {
//     console.log(`Server is running at http://${hostname}:${port}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('../config/db');
const purchaseRoutes = require('../routes/PurchaseRoutes');
const tableRoute = require('../routes/tableRoute');
const foodItemRoutes = require('../routes/foodItem');
const foodGroupRoutes =require('../routes/FoodGroup')
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();
const port = process.env.PORT || 5000;
const hostname = process.env.HOSTNAME || 'localhost';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', purchaseRoutes);
app.use('/api/tables', tableRoute);
app.use('/api/foodItems', foodItemRoutes); // Ensure route is correctly defined
app.use('/api/foodgroups',foodGroupRoutes)
// Catch-all route to handle undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
});

