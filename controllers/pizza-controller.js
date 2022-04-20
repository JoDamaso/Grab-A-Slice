const { Pizza } = require('../models');

// functions go here as methods are defined
// these methods will be used as Callback functions for express routes and will take req, res

const pizzaController = {
    //get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
            .populate({
                path: 'comments',
                select: '-__v' // ignores this field while in populate
            })
            .select('-__v') // ignores this field while we return the data
            .sort({ _id: -1 })
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.error(err);
                res.status(400).json(err);
            });
    },

    //get one pizza
    getPizzaById(req, res) {
        Pizza.findOne({ _id: req.params.id })
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .then(dbPizzaData => {
                // if no pizza is found, send 404
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => {
                console.error(err);
                res.status(400).json(err);
            });
    },

    // POST & create a pizza
    // destructure body to use as 'req'
    // create() handles one or multiple inserts, in mongoose
    createPizza({ body }, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },

    // UPDATE pizza by _id
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!'})
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    },

    // DELETE a pizza by _id
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData)
            })
            .catch(err => res.status(400).json(err))
    }
};

module.exports = pizzaController;