const { Router } = require("express")
const userRouter = require("./user.routes")
const movieNoteRouter = require("./movies_notes.routes")
const movieTagsRouter = require("./movie_tags.routes")
const sessionRouter = require("./sessions.routes")

const routes = Router()

routes.use("/users", userRouter)
routes.use("/movies_note", movieNoteRouter)
routes.use("/movie_tags", movieTagsRouter)
routes.use("/sessions", sessionRouter)

module.exports = routes