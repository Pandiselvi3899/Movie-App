const moongose = require('mongoose');

const LocalDb = 'mongodb://localhost/cinema';

// moongose.connect(process.env.DATABASE, {
moongose.connect(LocalDb, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('Database connected successfully.'))
.catch(err => console.error('Connection Error', err));

const db = moongose.connection;

module.exports = db;