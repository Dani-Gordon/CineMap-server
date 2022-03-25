import express from 'express';
import secureRoute from '../middleware/secureRoute.js';
import filmController from '../controllers/filmController.js';
import userController from '../controllers/userController.js';
import commentController from '../controllers/commentController.js';

const router = express.Router();

router
  .route('/film')
  .post(filmController.createFilm)
  .get(filmController.getAllFilms);

router
  .route('/film/:id')
  .put(filmController.updateFilm)
  .get(filmController.getFilmById)
  .delete(filmController.deleteFilm);

router
  .route('/film/:id/comments')
  .post(secureRoute, commentController.createComment);

router.route('/film/random/randomfilm').get(filmController.getRandomFilm);

router.route('/film/:id/like').put(secureRoute, userController.addLikedFilm);
router
  .route('/film/:id/removeLike')
  .put(secureRoute, userController.removeLikedFilm);

router
  .route('/film/continent/:continent')
  .get(filmController.getAllFilmsByContinent);

router
  .route('/film/:id/comment/:commentId')
  .delete(secureRoute, commentController.deleteComment);

router.route('/register').post(userController.registerUser);
router.route('/login').post(userController.loginUser);
router.route('/users').get(userController.getAllUsers);
router
  .route('/users/:userId')
  .delete(userController.deleteUser)
  .get(secureRoute, userController.getAllLikedFilmsForUser);

export default router;
