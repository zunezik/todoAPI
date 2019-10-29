const express = require('express');
const app = express()

function logRequest({method, url}, res, next) {
    console.log(`[${new Date().toISOString()}] ${method} ${url}`)
    next()
}

app.use(express.json())
app.use(logRequest)

const tasks = [{name: 'Get tasks'}, {name: 'Create task'}]

app.get('/tasks', (req, res) => res.json(tasks))

app.post('/tasks', (req, res) => {
    const task = req.body
    tasks.push(task)
    res.json(task)
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server started at localhost:${port}`)
})
