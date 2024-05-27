const { Router } = require("express")
const ensureAuthenticate = require("../middleware/ensureAuthenticate")
const multer = require("multer")
const uploadConfig = require("../config/upload.js")

const AvatarController = require("../controller/AvatarController")
const UserController = require("../controller/UserController")

const userController = new UserController()
const avatarController = new AvatarController()

const userRouter = Router()
const upload = multer(uploadConfig.MULTER)

userRouter.post("/", userController.create)
userRouter.put("/", ensureAuthenticate, userController.update)
userRouter.patch("/avatar", ensureAuthenticate, upload.single("avatar"), avatarController.update)

module.exports = userRouter