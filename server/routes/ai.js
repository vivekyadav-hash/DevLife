const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/user');

router.post('/roadmap', authMiddleware, async (req, res) => {
    try {
        const { goal, branch, skills, hoursPerDay } = req.body;

        const prompt = `You are a career counselor for Indian engineering students. 
        A student has provided the following information:
        - Goal: ${goal}
        - Branch: ${branch}
        - Skills they want to build: ${skills}
        - Hours available per day: ${hoursPerDay}
        
        Create a concise 3-month roadmap for this student. 
        Format it as a JSON object with this structure:
        {
            "summary": "2 line summary",
            "month1": "what to focus on in month 1",
            "month2": "what to focus on in month 2", 
            "month3": "what to focus on in month 3",
            "dailyTasks": ["task1", "task2", "task3"]
        }
        Return only valid JSON, nothing else.`;

        const response = await fetch(
    'https://api.groq.com/openai/v1/chat/completions',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: 'llama3-8b-8192',
            messages: [
                { role: 'user', content: prompt }
            ]
        })
    }
);



      const data = await response.json();
        const text = data.choices[0].message.content;
        const clean = text.replace(/```json|```/g, '').trim();
        const roadmap = JSON.parse(clean);

        // Mark user as not new
        await User.findByIdAndUpdate(req.user.userId, { isNewUser: false });

        res.status(200).json({ roadmap });

    } catch (err) {
        console.error('AI error:', err);
        res.status(500).json({ message: 'AI error', error: err.message });
    }
});

router.get('/isnewuser', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        res.status(200).json({ isNewUser: user.isNewUser });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;