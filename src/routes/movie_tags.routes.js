const { Router } = require("express")
const MovieTagsController = require("../controller/MovieTagsController")
const ensureAuthenticate = require("../middleware/ensureAuthenticate")

const movieTagsRouter = Router()
const movieTagsController = new MovieTagsController()

movieTagsRouter.use(ensureAuthenticate)

movieTagsRouter.get("/:user_id", movieTagsController.index)

module.exports = movieTagsRouter