const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { movieController, postController } = require('../controllers');

// middleware that is specific to this router

router.get('/', movieController.getMovies);
router.post('/', auth(), movieController.createMovie);

router.get('/:movieId', movieController.getMovie);
router.post('/:movieId', auth(), postController.createPost);
router.put('/:movieId', auth(), movieController.subscribe);
router.put('/:movieId/posts/:postId', auth(), postController.editPost);
router.delete('/:movieId/posts/:postId', auth(), postController.deletePost);

// router.get('/my-trips/:id/reservations', auth(), movieController.getReservations);

module.exports = router