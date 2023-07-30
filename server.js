const mongoose = require("mongoose");
const config = require('./untils/config');
const app = require("./app");

console.log("connection to MongoDB");

mongoose.connect(config.MONGO_URL)
    .then((result) => {
        console.log('Connected to MongoDB');
        app.listen((config.PORT), () => {
            console.log(`Server listening to PORT ${config.PORT}`)
        })

    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message);
    })