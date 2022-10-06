const { Schema, model, Types } = require("mongoose")
const dateFormat = require("../utils/dateFormat")

const ReplySchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            require: true,
            maxLength: 280,
        },
        username: {
            type: String,
            require: true,
        }, 
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        }
    },
    {
        toJSON: {
            getters: true,
        }
    }
)

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            require: true,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
        username: {
            type: String, 
            require: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)

ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length
})

// create model
const Thought = model("Thought", ThoughtSchema)

module.exports = Thought