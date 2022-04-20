const router = require('express').Router();

// destructure the methods instead of the entire object
const { addComment, removeComment } = require('../../controllers/comment-controller');

// use Callbacks 
// /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

// /api/comments/<pizzaId>/<commentId>
router.route('/:pizzaId/:commentId').delete(removeComment);

module.exports = router;