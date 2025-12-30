const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const db_url = process.env.DB_URL ;

const DbConnection =mongoose
.connect(db_url)
.then(() => {
    console.log("Connect to Mongodb...");
}).catch((error) => {
    console.log("Connection failed...", error);
});

module.exports = {DbConnection};

// .connect require the usrl of database
// .then() is used to handle the successful connection
// .catch() is used to handle any errors that occur during the connection process                                                                                       
