const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat.js');

const PizzaSchema = new Schema(
    {
        pizzaName: {
            type: String,
            required: true, // requires the data in order to be made correctly
            trim: true, // takes off any white spaces before and after 
        },

        createdBy: {
            type: String,
            required: true,
            trim: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
            // everytime we retrieve a pizza, the value in 'createdAt' field will be formatted by dateFormat(), instead of the default timestamp value
        },

        size: {
            type: String,
            required: true,
            // enumerable - a set of data that can be iterated over, much linke a for...in loop to iterate over an object
            enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
            default: 'Large'
        },

        toppings: [],

        // we push and pull to this array when we are doing our routes
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// create the Pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza Model
module.exports = Pizza;