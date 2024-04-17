// import dotenv from 'dotenv';
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

const PORT = 5000;

mongoose.connect(process.env.MongoDB_URL)
.then(()=> {
    console.log("Database connected successfully");
})
.catch((err)=> {
    console.log(err);
})


const studentRoute = require('./routes/studentRoutes.cjs');
const courseRoute = require('./routes/courseRoutes.cjs');
const feedbackRoute = require('./routes/feedbackRoutes.cjs');
const facultyRoute = require('./routes/facultyRoutes.cjs');


app.use('/student', studentRoute);
app.use('/course', courseRoute);
app.use('/feedback', feedbackRoute);
app.use('/faculty', facultyRoute);

app.listen(PORT, () => {
    console.log(`App is Running at ${PORT} `);
})
