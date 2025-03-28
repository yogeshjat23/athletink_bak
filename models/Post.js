const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

   
      photo: {
        type: String, 
        default: '/assets/5.jpeg',
    },
       
    
    team_name: { 
        type: String,
    required: true,

    },
  name:{
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  }, 
  gender:{
    type: String,
    required: true,
  } ,
  contact:{
    type: Number,
    required: true,
  } ,
  sport:{
    type: String,
    required: true,
  } ,

  location:{ 
    type: String,
    required: true,

  } ,
  lat:{  
    type: Number,
    required: true,


  },
  lng:{
    type: Number,
    required: true,

  } ,
  player_need:{
    type: Number,
    required: true,

  },
 
      teamDetails: [
        {
            name: { type: String, required: true },
            age: { type: Number, required: true },
            phoneNumber: { type: String, required: true },
            gender: { type: String, required: false }, 
            email: { type: String, required: true }
            
        }
    ],
      
    


});


module.exports = mongoose.model("Post", PostSchema);    