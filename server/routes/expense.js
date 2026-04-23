const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Expense = require('../models/Expense');

router.post('/' , authMiddleware , async (req ,res ) =>{
    try{
        const{title , amount , purpose} = req.body;
        const userId = req.user.userId;
        const newExpense = new Expense({
            title,
            amount ,
            purpose,
           userId
        })
        await newExpense.save();
        res.status(201).json({message : 'Expenses recorded '});
    }catch(err) {
        res.status(500).json({message : 'Server error' , error : err.message})
    };
});

router.get('/' , authMiddleware, async(req, res) =>{
    try{
        const expenses = await Expense.find({userId: req.user.userId});
        res.status(201).json({expenses});
    }catch(err) {
        res.status(500).json({message : 'Server error' , error : err.message})
    };
});

router.put('/:id', authMiddleware, async(req, res)=>{
    try{
        const expense = await Expense.findByIdAndUpdate(req.params.id , req.body , {new: true});
        if(!expense){
            return res.status(404).json({message :'Expense is not found'});
        }
        res.status(200).json({message : 'Expense updated ', expense});
    }catch(err){
        res.status(500).json({message: "server error" , error : err.message});
    }
})

router.delete('/:id' , authMiddleware ,async (req, res) => {
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({message : 'Expense deleted'});
    }catch (err){
        res.status(500).json({message : 'server Error' , error : err.message});
    }
})
module.exports = router ;