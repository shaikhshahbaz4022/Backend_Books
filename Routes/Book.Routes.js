const express = require('express');
const BookModel = require('../Model/BookModel');
const BookRouter = express.Router()

BookRouter.get("/", async (req, res) => {
    try {
        const data = await BookModel.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(401).send({ msg: error.message })
    }
})
BookRouter.post("/add", async (req, res) => {
    const payload = req.body
    try {
        const NewData = new BookModel(payload)
        await NewData.save()
        res.status(200).send({ msg: "Book Added Succesfully" })

    } catch (error) {
        res.status(401).send({ msg: error.message })

    }
})
BookRouter.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deleteBook = await BookModel.findByIdAndDelete({ _id: id })
        res.status(200).send({ msg: "Book Deleted Succesfully", ok: true })

    } catch (error) {
        res.status(401).send({ msg: error.message })

    }
})

BookRouter.get("/filter", async (req, res) => {

    try {
        const { genre } = req.query
        const Books = await BookModel.find({ genre })
        res.status(200).send(Books)
    } catch (error) {
        res.status(401).send({ msg: error.message })

    }
})

BookRouter.get("/sort/asc", async (req, res) => {
    try {
        const bookdata = await BookModel.aggregate(
            [
                { $sort: { price: 1 } }
            ]
        )
        res.status(200).send(bookdata)

    } catch (error) {
        res.status(401).send({ msg: error.message })

    }
})

BookRouter.get("/sort/desc", async (req, res) => {
    try {
        const bookdata = await BookModel.aggregate(
            [
                { $sort: { price: -1 } }
            ]
        )
        res.status(200).send(bookdata)

    } catch (error) {
        res.status(401).send({ msg: error.message })

    }
})
module.exports = { BookRouter }