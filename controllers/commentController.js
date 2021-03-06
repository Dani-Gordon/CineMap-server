import Film from '../models/film.js';

const createComment = async (request, response, next) => {
  try {
    const filmToComment = await Film.findById(request.params.id);

    if (!filmToComment) {
      return response.status(404).send({ message: 'Film not found' });
    }

    const newComment = { ...request.body, createdBy: request.currentUser._id };

    filmToComment.comments.push(newComment);
    const savedFilm = await filmToComment.save();

    return response.status(201).json(savedFilm);
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) {
      return res.status(404).send({ message: 'film not found' });
    }

    const comment = film.comments.id(req.params.commentId);

    if (!comment) {
      return res.status(404).send({ message: 'error' });
    }
    if (
      comment.createdBy.equals(req.currentUser._id) ||
      req.currentUser.isAdmin
    ) {
      comment.remove();
      const savedFilm = await film.save();
      return res.status(200).send(savedFilm);
    }

    return res
      .status(404)
      .send({ message: 'not authorised to delete this comment' });
  } catch (e) {
    next(e);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { id, commentId } = req.params;
    const film = await Film.findById(id);

    if (!film) {
      return res.status(404).send({ message: 'Film not found' });
    }

    const comment = film.comments.id(commentId);

    if (!comment) {
      return res.status(404).send({ message: 'Comment not found' });
    }
    if (!comment.createdBy.equals(req.currentUser._id)) {
      return res.status(401).send({ message: 'Unauthorized action' });
    }
    comment.set(req.body);

    const savedFilm = await film.save();
    return res.status(200).send(savedFilm);
  } catch (e) {
    next(e);
  }
};

export default { createComment, deleteComment, updateComment };
