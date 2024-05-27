require("dotenv/config")
require("express-async-errors")

const express = require("express")
const AppError = require("./utils/AppError")
const routes = require("./routes")
const cors = require("cors")
const uploadConfig = require("./config/upload.js")
const migrationsRun = require("./database/knex")

migrationsRun()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER))

app.use(routes)

app.use((error, req, res, next) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: "Error",
            message: error.message
        })
    }

    console.error(error)

    return res.status(500).json({
        status: "Error",
        message: "Internal Server Error"
    })
})

const PORT = process.env.SERVER_PORT
app.listen(PORT, () => {
    console.log("Estou ouvindo aqui")
})