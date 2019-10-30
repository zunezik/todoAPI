const express = require("express")
const router = express.Router()
const Todo = require("../models/Todo")

router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find({ listId: req.query.listId })
        res.json(todos)
    } catch (err) {
        res.json({ message: err })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)
        res.json(todo)
    } catch (err) {
        res.json({ message: err })
    }
})

router.post("/", (req, res) => {
    const todo = new Todo({
        listId: req.body.listId,
        name: req.body.name,
        done: req.body.done
    })

    todo.save()
        .then(data => res.json(data))
        .catch(err => res.json({ message: err }))
})

router.delete("/:id", async (req, res) => {
    try {
        const removedTodo = await Todo.deleteOne({ _id: req.params.id })
        res.json(removedTodo)
    } catch (err) {
        res.json({ message: err })
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const updatedTodo = await Todo.updateOne(
            { _id: req.params.id },
            { $set: { name: req.body.name, done: req.body.done } }
        )
        res.json(updatedTodo)
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router
