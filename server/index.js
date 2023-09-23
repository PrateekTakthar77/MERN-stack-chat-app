const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3030;

const app = express();

app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        message: 'working'
    })
})

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
