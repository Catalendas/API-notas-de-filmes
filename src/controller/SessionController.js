const  { compare } = require("bcryptjs")
const AppError = require("../utils/AppError")
const jwtconfig = require("../config/auth")
const { sign } = require("jsonwebtoken")

const knex = require("../database/knex")

class SessionController {
    async create(req, res) {
        const { email, password} = req.body

        const user = await knex("users").where({ email }).first()

        if (!user) {
            throw new AppError("Email e/ou senha incorretas", 401)
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new AppError("Email e/ou senha incorretas", 401)
        }

        const {expiresIn, secret } = jwtconfig.jwt

        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        return res.json({ user, token })
    }
}

module.exports = SessionController