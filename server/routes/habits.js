const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Habits = require('../models/Habits');


router.post('/' , authMiddleware, async(req , res) =>{
    try{
        const{name , frequency , isCompleted} = req.body ;
        const userId = req.user.userId;
        const newHabits = new Habits({
            name, 
            frequency, 
            isCompleted, 
            userId
        })
        await newHabits.save();
        res.status(201).json({message: 'Your habit is marked'});
    }catch(err){
        res.status(500).json({message : 'Server error' , error : err.message });
    }
});

router.get('/', authMiddleware, async(req , res) =>{
    try{
        const Habit = await Habits.find({userId: req.user.userId});
        res.status(200).json({ habits: Habit });
    }catch(err){
        res.status(500).json({message : 'Server error' , error : err.message });
    }
})

router.put('/:id' , authMiddleware , async (req, res) =>{
    try{
        const habit = await Habits.findByIdAndUpdate(req.params.id , req.body , {new: true});
        if(!habit){
            return res.status(404).json({message: 'habit not found'});
        }
        res.status(200).json({message: 'Habit Upadated' , habit});
    }catch(err){
        res.status(500).json({message : 'Server error' , error : err.message });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Habits.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Habit deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;