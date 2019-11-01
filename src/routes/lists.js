const express = require("express")
const router = express.Router()
const List = require("../models/List")
const Todo = require("../models/Todo")

router.get("/", async (req, res) => {
    const lists = await List.find()
    res.json(lists)
})

router.get("/:id", async (req, res) => {
    try {
        const list = await List.findById(req.params.id)
        res.json(list)
    } catch (err) {
        res.json({ message: err })
    }
})

router.post("/", async (req, res) => {
    const list = new List({
        name: req.body.name
    })

    list.save()
        .then(data => res.json(data))
        .catch(err => res.json({ message: err }))
})

router.delete("/:id", async (req, res) => {
    try {
        const removedList = await List.deleteOne({ _id: req.params.id })
        await Todo.deleteMany({ listId: req.params.id })
        res.json(removedList)
    } catch (err) {
        res.json({ message: err })
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const updatedList = await List.updateOne(
            { _id: req.params.id },
            { $set: { name: req.body.name } }
        )
        res.json(updatedList)
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router
