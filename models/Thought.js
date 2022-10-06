const { Schema, model } = require("mongoose")
const dateFormat = require("../utils/dateFormat")

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
    }
)

// create model
const Thought = model("Thought", ThoughtSchema)

module.exports = Thought