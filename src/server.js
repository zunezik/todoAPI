const express = require('express');
const app = express()

function logRequest({method, url}, res, next) {
    console.log(`[${new Date().toISOString()}] ${method} ${url}`)
    next()
}

app.use(express.json())
app.use(logRequest)

const tasks = [{id: 1, name: 'Get tasks'}, {id: 2, name: 'Create task'}]

app.get('/tasks', (req, res) => res.json(tasks))

app.post('/tasks', (req, res) => {
    const task = req.body
    task.id = parseInt(task.id)
    
    tasks.push(task)
    res.json(task)
})

app.patch('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id)
    const task = tasks.find(t => t.id === taskId)

    if(task) {
        Object.assign(task, req.body)
        res.json(task)
    } else {
        res.status(404).json({error: 'Task not found'})
    }
})

app.delete('/tasks/:id', (req, res) => {
    const taskToDelete = parseInt(req.params.id)
    const task = tasks.find(t => t.id === taskToDelete)
    const idx = tasks.findIndex((t) => t.id == taskToDelete.id)

    if(idx) {
        tasks.splice(idx, 1);
        res.json(task)
    } else {
        res.status(404).json({error: 'Task not found'})
    }

    res.json(taskToDelete)
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server started at localhost:${port}`)
})
