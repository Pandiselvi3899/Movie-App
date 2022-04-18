const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('../models/movieModel');

dotenv.config({ path: './../config.env' });

const LocalDb = 'mongodb://localhost/cinema';

// mongoose.connect(process.env.DATABASE, {
mongoose.connect(LocalDb, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('Database Connected Successfully'));

// READING FILE

const tours = JSON.parse(fs.readFileSync(`${__dirname}/movies.json`));

// IMPORT DATA TO DATABASE
const importData = async () => {
  try {
    await Movie.create(tours);
    console.log('Data Successfully Imported');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//DELETE DATA FROM DATABASE

const deleteData = async () => {
  try {
    await Movie.deleteMany();
    console.log('Data Successfully Deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
