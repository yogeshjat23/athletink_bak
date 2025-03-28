const express =require('express') ;
const Post = require('../models/Post') ; 
const router = express.Router(); 
router.post('/post' , async(req , res)=>{
     
    const {   team_name,name,age, gender ,contact ,sport , location , lat, lng , player_need, teamDetails } = req.body ; 
    if ( !team_name || !name || !age || !sport || !location) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
               
        const newPost = new Post({team_name,name,age, gender ,contact ,sport , location , lat, lng , player_need, teamDetails });
        await newPost.save();
        res.status(201).json(newPost);

    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }





}) ; 

router.get('/posts', async (req, res) => {
    try {
      const posts = await Post.find(); 
      res.status(200).json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });  


  


  // Add a new team member
  router.patch('/post/:id/add-player', async (req, res) => {
    const { id } = req.params;
    const { name, age, gender, phoneNumber  , email} = req.body;
    console.log(req.body);
  
    if (!name || !age || !phoneNumber  || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { $push: { teamDetails: { name, age, gender, phoneNumber , email } } ,
      
        $inc: { player_need: -1 } // Decrement player_need by 1
        
              
      },
        { new: true } // Return the updated document ,
        
      
      );
  
      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.status(200).json({ message: 'Player added successfully', post: updatedPost });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add player' });
    }
  });
module.exports = router;
