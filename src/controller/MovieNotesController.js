const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class MovieNotesController {

    async index(req, res) {
        const { user_id, title, tags } = req.query
     
        let notes

        if (tags) {
            const filterTags = tags.split(",").map(tags => tags.trim())
            notes = await knex("movie_tags")
                .select([
                    "movie_notes.id",
                    "movie_notes.title",
                    "movie_notes.user_id"
                ])
                .where("movie_notes.user_id", user_id )
                .whereLike("movie_notes.title", `%${title}%`)
                .whereIn("name", filterTags)
                .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id")
                .orderBy("movie_notes.title")
        } else {

            notes = await knex("movie_notes")
                .where({ user_id })
                .whereLike("title", `%${title}%`)
                .orderBy("title")
        }


        const userTags = await knex("movie_tags")
            .where({ user_id })    
        const movieNotesWith = notes.map(note => {
            const notesTags = userTags.filter(tag => tag.note_id === note.id)

            return {
                ...note,
                tags: notesTags
            }
        })

        return res.json(movieNotesWith)
    }

    async create(req, res) {
        const { title, description, rating, tags } = req.body
        const user_id = req.user.id

        const [userAlredyExists] = await knex("users").where({ id: user_id })

        if (userAlredyExists.id != user_id) {
            throw new AppError("This user is not exist")
        }

        if (!title) {
            throw new AppError("You need to provide the title")
        }

        if (rating > 5 || rating < 0) {
            throw new AppError("You must enter a title from 0 to 5")
        }

        const [movieNote] = await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id: userAlredyExists.id
        })

        const insertTags = tags.map(name => ({
            name,
            user_id,
            note_id: movieNote
        }))

        await knex("movie_tags").insert(insertTags)

        return res.status(201).json()
    }

    async show(req, res) {
        const { note_id } = req.params

        const movieNote = await knex("movie_notes").where({ id: note_id }).orderBy("title")
        const movieTags = await knex("movie_tags").where({ note_id }).orderBy("name")

        return res.json({
            ...movieNote,
            movieTags
        })
    }

    async delete(req, res) {
        const { note_id } = req.params

        await knex("movie_notes").delete().where({ id: note_id })

        return res.json()
    }

}

module.exports = MovieNotesController