const { Router } = require("express")
const MovieNotesController = require("../controller/MovieNotesController")

const movieNoteRouter = Router()
const movieNotesController = new MovieNotesController()

movieNoteRouter.post("/:user_id", movieNotesController.create)
movieNoteRouter.get("/", movieNotesController.index)
movieNoteRouter.get("/:note_id", movieNotesController.show)
movieNoteRouter.delete("/:note_id", movieNotesController.delete)

module.exports = movieNoteRouter