const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const path = require("path");

const db = require('./db');
const movieRouter = require('./routes/movieRouter');


const app = express();
const PORT = process.env.PORT || 8080;


app.use(cors());

// parse incomming json request
app.use(express.json({ limit: '10kb' }));

// recognizes incomming request object as string or array
app.use(express.urlencoded({ extended: true }));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// app.use(express.static(path.join(__dirname, "client", "build")))

app.use('/api/v1/movies', movieRouter);

// app.all('*', (req, res) => {
//     res.status(404).json({
//         status: 'fail',
//         message: `Page you are looking does'nt exist`
//     });
// })

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

app.get("*", (req, res) => {
    res.json({
        status: "Failed",
        message: "No such path exist"
    });
})

// start the server
app.listen(PORT, () => {
    console.log(`App running on port no. ${PORT}`);
});