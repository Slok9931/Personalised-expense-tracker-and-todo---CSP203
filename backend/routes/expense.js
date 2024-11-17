const express = require("express");
const { body, validationResult } = require("express-validator");
const Router = express.Router();
const Expense = require("../models/Expense");
const fetchuser = require("../middleware/fetchuser");

//show all expenses
Router.get("/",fetchuser, async (req,res) => {
    const allexpenses = await Expense.find({user: req.user.id});
    res.json(allexpenses);
});


//new expense
Router.post('/new',fetchuser, async(req,res) => {
    const {account, amount, type, date, category, title, description} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const newExpense = new Expense({account, amount, type, date, category, title, description, user: req.user.id});
        const savedExpense = await newExpense.save();
        res.json(savedExpense);
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Error occured.");
    }
});

//edit expense
Router.put('/:id/edit', fetchuser, async (req,res) => {
    const expense = await Expense.findById(req.params.id);
    if(!expense){
        return res.status(404).send("Not found");
    }
    if (expense.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
    }
    try{
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id,{ ...req.body }, {new:true, runValidators:true});
        await updatedExpense.save();
        res.json(updatedExpense);
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Error occured.");
    }

});

//delete expense
Router.delete('/:id/delete', fetchuser, async (req,res) => {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
        return res.status(404).send("Not found");
    }
    if (expense.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
    }
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
        res.send("Success: Transaction has been deleted");
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Error occured.");
    }
});

module.exports = Router;