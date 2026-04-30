const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/auth');
 const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');
const expenseRouter = require('./routes/expense');
const habitRouter = require('./routes/habits');



const app = express();
const port = process.env.PORT || 8080;


app.use(cors({
  origin: 'http://localhost:5173' ,
  credentials : true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/expenses' , expenseRouter);
app.use('/api/habits' , habitRouter);

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

   
