const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true
    },
    savedboolean: {
        type: Boolean,
        default: false
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Notes"
    },
    sum: {
        type: String,
        required: false,
        default: "Summary not available at this time"
    }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;




