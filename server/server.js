const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(port, () => {
            console.log(`Server is working on port ${port}`);
        });
    })
    .catch((err) => {
        console.log('Connection failed', err);
    });

    const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

const taskRoutes = require('./routes/task');
app.use('/api/tasks', taskRoutes);
