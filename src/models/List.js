const { Schema, model } = require("mongoose")

const ListSchema = new Schema({
    name: String
})

module.exports = model("Lists", ListSchema)
