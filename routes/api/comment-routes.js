const router = require('express').Router();

// destructure the methods instead of the entire object
const { 
    addComment, 
    removeComment,
    addReply, 
    removeReply,    
} = require('../../controllers/comment-controller.js');

// use Callbacks 
// "Go to this pizza, then look at this particular comment, then delete this one reply."
// ids of the parent resources in the endpoint.


// /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

// /api/comments/<pizzaId>/<commentId>
router.route('/:pizzaId/:commentId').delete(removeComment);

// /api/comments/:pizzaId/:commentId
router
    .route('/:pizzaId/:commentId')
    .put(addReply)
    .delete(removeComment);

// /api/comments/:pizzaId/:commentId/:replyId
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

module.exports = router;