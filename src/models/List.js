const { Schema, model } = require("mongoose")

const ListSchema = new Schema(
    {
        name: String
    },
    { versionKey: false }
)

ListSchema.set("toJSON", {
    transform: (doc, ret, options) => {
        ret.id = ret._id
        delete ret._id
    }
})

module.exports = model("Lists", ListSchema)
