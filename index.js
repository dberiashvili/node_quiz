const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const questionRoute = require('./routes/questions');
const statsRoute = require('./routes/leaderboard');
const addScore = require('./routes/Answer')

dotenv.config();

//Connect to the dataBase
mongoose.connect(process.env.DB_CONNECT,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log("connected to the database")
);

//MiddleWares
app.use(express.json());
app.use('/', authRoute);
app.use('/', questionRoute);
app.use('/', statsRoute);
app.use('/', addScore);


app.listen(process.env.PORT || 3000, () => console.log("server is running"));