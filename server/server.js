require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});

// Middleware to validate JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

// Hardcoded credentials for testing purposes
const USERNAME = 'gabriel';
const PASSWORD = 'gabriel';

// MySQL database connection setup
const db = mysql.createConnection({
    host: 'sql5.freemysqlhosting.net',
    user: 'sql5750365',
    password: 'UbkU56dHux', // Replace with your actual password
    database: 'sql5750365' // Replace with your actual database name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Check hardcoded credentials
    if (username === USERNAME && password === PASSWORD) {
        const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });
        return res.json({ token });
    }

    // If credentials are incorrect
    return res.status(401).json({ message: 'Invalid credentials' });
});

// Endpoint to get MarketData
app.get('/api/marketdata', (req, res) => {
    const query = 'SELECT * FROM MarketData';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
        res.json(results);
    });
});

// Endpoint to get HealthPerformance data
app.get('/api/healthperformance', (req, res) => {
    const query = 'SELECT * FROM HealthPerformance';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
        res.json(results);
    });
});




// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});