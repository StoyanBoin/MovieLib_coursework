const { movieModel } = require('../models');
const { newPost } = require('./postController')

function getMovies(req, res, next) {
    movieModel.find()
        .populate('userId')
        .then(movies => res.json(movies))
        .catch(next);
}

function getMovie(req, res, next) {
    const { movieId } = req.params;

    movieModel.findById(movieId)
        .populate({
            path : 'posts',
            populate : {
              path : 'userId'
            }
          })
        .then(movie => res.json(movie))
        .catch(next);
}

function createMovie(req, res, next) {
    const { movieName, postText } = req.body;
    const { _id: userId } = req.user;

    movieModel.create({ movieName, userId, subscribers: [userId] })
        .then(movie => {
            newPost(postText, userId, movie._id)
                .then(([_, updatedMovie]) => res.status(200).json(updatedMovie))
        })
        .catch(next);
}

function subscribe(req, res, next) {
    const movieId = req.params.movieId;
    const { _id: userId } = req.user;
    movieModel.findByIdAndUpdate({ _id: movieId }, { $addToSet: { subscribers: userId } }, { new: true })
        .then(updatedMovie => {
            res.status(200).json(updatedMovie)
        })
        .catch(next);
}

module.exports = {
    getMovies,
    createMovie,
    getMovie,
    subscribe,
}
