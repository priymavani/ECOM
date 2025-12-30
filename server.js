const express = require('express');
const {DbConnection} = require('./config/db');
const fs = require('fs');

DbConnection;

const app = express();

app.listen(3000, () => {
    console.log("Server is Running on the http://localhost/3000");
})