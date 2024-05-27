const { Router } = require("express")
const MovieNotesController = require("../controller/MovieNotesController")
const ensureAuthenticate = require("../middleware/ensureAuthenticate")

const movieNoteRouter = Router()
const movieNotesController = new MovieNotesController()

movieNoteRouter.use(ensureAuthenticate)

movieNoteRouter.post("/", movieNotesController.create)
movieNoteRouter.get("/", movieNotesController.index)
movieNoteRouter.get("/:note_id", movieNotesController.show)
movieNoteRouter.delete("/:note_id", movieNotesController.delete)

module.exports = movieNoteRouter