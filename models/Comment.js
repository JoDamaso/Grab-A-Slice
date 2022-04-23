const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat.js');

// subdocument
const ReplySchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment _id
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String,
            required: true,
            trim: true,
        },
        writtenBy: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
            // everytime we retrieve a pizza, the value in 'createdAt' field will be formatted by dateFormat(), instead of the default timestamp value
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const CommentSchema = new Schema(
    {
        writtenBy: {
            type: String,
            required: true, // validators
            trim: true // validators
        },

        commentBody: {
            type: String,
            required: true,
            trim: true
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
            // everytime we retrieve a pizza, the value in 'createdAt' field will be formatted by dateFormat(), instead of the default timestamp value
        },

        // associating replies with comments 
        // use ReplySchema to validate data for a reply
        // we push and pull from this array whenever were doing routes
        replies: [ReplySchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

// get total count of replies on retrieval
CommentSchema.virtual('replyCount').get(function () {
    return this.replies.length;
})

const Comment = model('Comment', CommentSchema);

module.exports = Comment;