const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const userRouters = require('./routes/userRoutes');
const middleware = require('./untils/middleware');

app.use(cors());
app.use(bodyParser.json());
app.use(middleware.requestLogger);

app.use('/api/users', userRouters)

module.exports = app;