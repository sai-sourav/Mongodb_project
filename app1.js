const dotenv = require('dotenv');
dotenv.config();

const mongoconnect = require('./util/database').mongoconnect;
const express = require('express');
const app = express();

mongoconnect(() => {
    app.listen(4000);
})