const express = require('express');
const fs = require('fs');


const app = express();

app.listen(3000, () => {
    console.log("Server is Running on the http://localhost/3000");
})