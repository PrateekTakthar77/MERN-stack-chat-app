const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Import jwt library
const User = require('./models/User');
const cookieparser = require('cookie-parser')
const bycrypt = require('bcryptjs')
const bycryptSalt = bycrypt.genSaltSync(10);

// Load environment variables
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3030;
const JWT_SECRET = process.env.JWT_SECRET;

// Define CORS options
const corsOptions = {
    credentials: true,
    origin: 'http://localhost:5173' // Update the origin without the trailing slash
};

// Use 'cors' middleware with options
app.use(cors(corsOptions));
app.use(cookieparser());
app.use(express.json()); // Middleware for parsing JSON request bodies

app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'working'
    });
});

app.get('/profile', (req, res) => {
    const token = req.cookies?.token;
    if (token) {
        jwt.verify(token, JWT_SECRET, {}, (err, userData) => {
            if (err) throw err;
            res.json(userData);
        });
    } else {
        res.status(401).json('no token');
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username });
    if (foundUser) {
        const passOK = bycrypt.compareSync(password, foundUser.password)
        if (passOK) {
            jwt.sign({ userId: foundUser._id, username }, JWT_SECRET, (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({ id: foundUser._id });
            });
        }
    }
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hasedPassword = bycrypt.hashSync(password, bycryptSalt)
        const createdUser = await User.create({
            username: username,
            password: hasedPassword
        });
        jwt.sign({ userId: createdUser._id, username }, JWT_SECRET, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({ id: createdUser._id });
        });
    } catch (error) {
        res.status(500).json(`error`, error);
    }
});

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Database connected successfully :)");
        app.listen(PORT, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('App is running on port', PORT);
            }
        });
    })
    .catch((error) => {
        console.error("Error while connecting to the database: ", error);
    });
