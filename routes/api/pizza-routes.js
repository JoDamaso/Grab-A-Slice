const router = require('express').Router();

// destructure the methods instead of the entire object
const {
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
} = require('../../controllers/pizza-controller.js');


// Set up GET all and POST at /api/pizzas
// use Callbacks 
router
    .route('/')
    .get(getAllPizza)
    .post(createPizza);

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
router
    .route('/:id')
    .get(getPizzaById)
    .put(updatePizza)
    .delete(deletePizza);

module.exports = router;