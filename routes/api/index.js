// central hub for our api prefix-routes
const router = require('express').Router();

const commentRoutes = require('./comment-routes.js');
const pizzaRoutes = require('./pizza-routes.js');

//add prefix of '/pizzas' to routes created in `pizza-routes.js`
router.use('/comments', commentRoutes);
router.use('/pizzas', pizzaRoutes);

// sends our prefixes out
module.exports = router;