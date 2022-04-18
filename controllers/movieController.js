const Movie = require('./../models/movieModel');

// Get All Movies of the list
exports.getAllMovies = async (req, res, next) => {
    try {
        const movies = await Movie.find();

        res.status(200).json({
            nResults: movies.length,
            status: 'success',
            data: movies
        });
    } catch (err) { 
        // console.error('Error', err);
        res.json({
            status: 'fail',
            data: err
        });
    }  
};

// Create a new Movie in the list
exports.createMovie = async (req, res, next) => {
    try{
        const newMovie = await Movie.create(req.body);
        res.status(201).json({
            status: 'success',
            data: newMovie
        });
    } catch(err) {
        // console.error('Error', err);
        res.json({
            status: 'fail',
            data: err
        });
    }
};


// Get Movie Data by Id

exports.getMovie = async (req, res, next) => {
    try{
        const movie = await Movie.findOne({ _id: req.params.id });
        res.status(200).json({
            status: 'success',
            data: movie
        });
    } catch(err) {
        // console.error('Error', err);
        res.json({
            status: 'fail',
            data: err
        });
    }
};


// Update Movie Data
exports.updateMovie = async (req, res, next) => {
    try{
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: updatedMovie
        });
    } catch(err) {
        // console.error(err);
        res.json({
            status: 'fail',
            data: err
        });
    }
};

// Delete Movie Data
exports.deleteMovie = async (req, res, next) => {
    try{
        const movie = await Movie.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success'
        });
    } catch(err) {
        // console.error(err);
        res.json({
            status: 'fail',
            data: err
        });
    }
};