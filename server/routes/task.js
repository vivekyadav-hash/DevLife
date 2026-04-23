const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Task = require('../models/Task');



router.post('/', authMiddleware,  async ( req , res) =>{
try{
    const {title , description , category , isCompleted  } = req.body;
    const userId = req.user.userId;
    const newTask = new Task({
        title , 
        description, 
        category, 
        isCompleted , 
        userId
    })
    await newTask.save();
 res.status(201).json({ message: 'Your Task added  ' });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.get('/' , authMiddleware ,async (req ,res) =>{
    try{
    const tasks = await Task.find({ userId: req.user.userId });
    res.status(201).json({tasks});

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated', task });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;