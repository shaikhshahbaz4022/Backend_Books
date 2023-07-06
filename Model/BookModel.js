const mongoose = require('mongoose');
let bookobj = {
    title: String,
    author: String,
    genre: {
        type: String,
        enum: ["Fiction", "Science", "Comic"],
        default : "Fiction"
    },
    description: String,
    price: Number

}
const BookSchema = mongoose.Schema(bookobj)
const BookModel = mongoose.model("book", BookSchema)

module.exports = BookModel