const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
app.use(bodyParser.json())
app.use(cors())

const todosRoute = require("./routes/todos")
app.use("/todos", todosRoute)

const listsRoute = require("./routes/lists")
app.use("/lists", listsRoute)

async function start() {
    try {
        await mongoose.connect(
            "mongodb://localhost:27017/todoApp",
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            },
            () => {
                console.log("Connected to DB")
            }
        )

        const port = 3001
        app.listen(port, () => {
            console.log(`Server started at localhost:${port}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
