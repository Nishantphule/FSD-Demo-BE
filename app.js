const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const userRouters = require('./routes/userRoutes');
const middleware = require('./untils/middleware');

app.use(cors());
app.use(bodyParser.json());
app.use(middleware.requestLogger);
app.get("/", (req, res) => {
    res.send("<h1>Welcome to FSD-Demo-Backend-App</h1>")
})

app.use('/api/users', userRouters)

module.exports = app;