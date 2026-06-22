const mongoose = require('mongoose');
const roadmapSchema = new mongoose.Schema({
      userId: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'User',
           required: true
       },
       summary : {
        type: String ,
       }, 
       month1 : {
        type: String , 
       },
       month2 : {
        type : String , 
       }, 
       month3:{
        type : String ,
       }, 
       dailyTasks :{
        type : [String] ,
       }, timestamps: true 
});

module.exports = mongoose.model('roadmap' , roadmapSchema);