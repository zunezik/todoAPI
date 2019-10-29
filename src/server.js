const express = require('express');
const app = express()

function logRequest({method, url}, res, next) {
    console.log(`[${new Date().toISOString()}] ${method} ${url}`)
    next()
}

app.use(express.json())
app.use(logRequest)

let tasks = [{id: 1, name: 'Get tasks'}, {id: 2, name: 'Create task'}]

app.get('/tasks', (req, res) => res.json(tasks))

app.post('/tasks', (req, res) => {
    const task = req.body
    tasks.push(task)
    res.json(task)
})

app.put('/tasks', (req, res) => {
    const newTask = req.body
    const idx = tasks.findIndex((task) => task.id == newTask.id)

    tasks = [
        ...tasks.slice(0, idx),
        newTask,
        ...tasks.slice(idx + 1)
    ]

    res.json(newTask)
})

app.delete('/tasks', (req, res) => {
    const taskToDelete = req.body
    const idx = tasks.findIndex((task) => task.id == taskToDelete.id)
    tasks.splice(idx, 1);

    res.json(taskToDelete)
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server started at localhost:${port}`)
})
