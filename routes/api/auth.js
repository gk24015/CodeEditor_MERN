//for registering the user
const express= require('express');
const router = express.Router();

//bring middleware
const auth= require('../../middleware/auth');
const User = require('../../models/User');
//GET api/auth

//add a middleware
router.get('/',auth,async (req,res)=> {
  try{
      const user = await User.findById(req.user.id).select('-password');
      //to leave password "-password"

  }
  catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

module.exports = router;