const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
    statement: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    },
    correctAnswer: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Question', questionSchema)