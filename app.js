require('dotenv').config();
const express = require('express');
const setupRoutes = require('./routes/setup.js');

const app = express();
const PORT = process.env.PORT || 3001;

setupRoutes(app);
app.listen(PORT);
console.log(`App listening on port ${PORT}`);
