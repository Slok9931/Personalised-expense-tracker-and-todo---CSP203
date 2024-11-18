const mongoose = require('mongoose');
const {Schema} = mongoose;
const ExpenseSchema = new Schema({
    account: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum : ['dr', 'cr'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})
const Expense = mongoose.model('Expense', ExpenseSchema); 
module.exports = Expense;