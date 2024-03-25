require("express-async-errors")
const express = require("express")
const AppError = require("./utils/AppError")
const routes = require("./routes")

const app = express()
app.use(express.json())

app.use(routes)

app.use((error, req, res, next) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            code: "Error",
            message: error.message
        })
    }

    console.error(error)

    return res.status(500).json({
        code: "Error",
        message: "Internal Server Error"
    })
})

const PORT = 3333
app.listen(PORT, () => {
    console.log("Estou ouvindo aqui")
})