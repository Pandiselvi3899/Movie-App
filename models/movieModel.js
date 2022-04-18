const moongose = require('mongoose');

const movieSchema = moongose.Schema({
    title: {
        type: String,
        required: [true, 'Movie name must require']
    },
    poster: {
        type: String,
        // reuired: [true, 'Movie poster must require']
    },
    overview: {
        type: String,
        required: [true, 'Movie overview must required']
    },
    release_date: {
        type: Date,
        // required: [true, 'Movie released date must required']
    },
    genres: [String]
});

const Movie = moongose.model('Movie', movieSchema);

module.exports = Movie;