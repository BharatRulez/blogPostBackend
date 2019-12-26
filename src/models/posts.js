const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    
   title :{
    type: String
   },
   description : {
      type : String  
   },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    email: {
        type: String,
        //required: true
    },
   status:{
        type: Number,
        default: 1
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Posts', postSchema);