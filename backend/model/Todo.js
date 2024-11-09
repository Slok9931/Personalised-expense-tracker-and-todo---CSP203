const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    work: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    isComplete: {
        type: Boolean,
        default: false
    }
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
