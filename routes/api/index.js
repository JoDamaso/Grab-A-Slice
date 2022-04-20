// central hub for our api prefix-routes
const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes.js');

//add prefix of '/pizzas' to routes created in `pizza-routes.js`
router.use('/pizzas', pizzaRoutes);

// sends our prefixes out
module.exports = router;