const { Router } = require("express")
const UserController = require("../controller/UserController")

const userController = new UserController()

const userRouter = Router()

userRouter.post("/", userController.create)
userRouter.put("/:user_id", userController.update)

module.exports = userRouter