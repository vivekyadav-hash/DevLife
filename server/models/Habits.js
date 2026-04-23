const mongoose = require('mongoose');
const habitsSchema = new mongoose.Schema({
    name:{
        type : String , 
        required : true ,
    }, 
    frequency :{
        type : String , 
        required : true , 
    }, 
    isCompleted :{
        type: Boolean,
        default : false ,
    },
   userId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true
   },
   },{timestamps:true});

   module.exports = mongoose.model('Habits' , habitsSchema);