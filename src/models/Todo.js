const { Schema, model } = require("mongoose")

const TodoSchema = new Schema(
    {
        listId: String,
        task: String,
        done: Boolean
    },
    { versionKey: false }
)

TodoSchema.set("toJSON", {
    transform: (doc, ret, options) => {
        ret.id = ret._id
        delete ret._id
    }
})

module.exports = model("Todos", TodoSchema)
