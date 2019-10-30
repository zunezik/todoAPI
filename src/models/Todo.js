const { Schema, model } = require("mongoose")

const TodoSchema = new Schema({
    listId: String,
    name: String,
    done: Boolean
})

module.exports = model("Todos", TodoSchema)
