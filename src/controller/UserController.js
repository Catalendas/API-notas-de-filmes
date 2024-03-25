const { hash, compare } = require("bcryptjs")
const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class UserController {
    async create(req, res) {
        const { name, email, password, avatar} = req.body

        const emailAlreadyRegistered = await knex("users").where({ email })

        if (emailAlreadyRegistered.length) {
            throw new AppError("E-mail already registered")
        }

        const hashedPassword = await hash(password, 8)

        await knex("users").insert({
            name,
            email,
            password: hashedPassword,
            avatar
        })

        res.status(201).json()
    }

    async update(req, res) {
        const { name, email, password, old_password, avatar} = req.body
        const { user_id } = req.params

        const [userAlredyExists] = await knex("users").where({ id: user_id })

        if (userAlredyExists.id != user_id) {
            throw new AppError("This user is not exist")
        }

        const [userWithUpdatedEmail] = await knex("users").where({ email })

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== userAlredyExists.id) {
            throw new AppError("E-mail already registered")
        }

        userAlredyExists.name = name ?? userAlredyExists.name
        userAlredyExists.email = email ?? userAlredyExists.email
        userAlredyExists.avatar = avatar ?? userAlredyExists.avatar

        if (password && !old_password) {
            throw new AppError("You need to enter your old password")
        }
        
        if (password && old_password) {
            const comparePassword = await compare(old_password, userAlredyExists.password)



            if (!comparePassword) {
                throw new AppError("The old password is wrong")
            }

            userAlredyExists.password = await hash(password, 8)
        }

        await knex("users").update({
            name: userAlredyExists.name,
            email: userAlredyExists.email,
            password: userAlredyExists.password,
            avatar: userAlredyExists.avatar
        }).where({id: user_id})

        return res.json()
    }
}

module.exports = UserController