const express =require('express');
const { profile_url } = require('gravatar');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const request = require('request');
const config = require('config');
const axios = require('axios');
const checkObjectId = require('../../middleware/checkObjectId');
// @route GET api/profile/me
// @desc  Current user profile
// @access   Public
 
router.get('/me',auth, async (req, res) => {
    try{
        const profile= await Profile.findOne({user: req.user.id}).populate('user',['name','avatar']);
        if(!profile)
         return res.status(400).json({msg:'There is no profile for this user'});
         res.json(profile);
      }
    catch{
        console.error(err.message);
        res.status(500).send('Server Error');
         }
    

});
// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post('/',auth,
check('skills','Skills is required').notEmpty(),
async (req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors : errors.array()});
    }
    const {
        website,
        skills,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
        // spread the rest of the fields we don't need to check
        ...rest
      } = req.body;
      const profileFields = {
        user: req.user.id,
      
        skills: Array.isArray(skills)
          ? skills
          : skills.split(',').map((skill) => ' ' + skill.trim()),
        ...rest
      }; 
      // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    // normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0)
        socialFields[key] = normalize(value, { forceHttps: true });
    }
    // add to profileFields
    profileFields.social = socialFields;
    try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        return res.json(profile);
      } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
      }
})
// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/',async(req,res)=>{
  try{
    const profiles= await Profile.find().populate("user",['name','avatar']);
    res.json(profiles);
  }
  catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})
// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
  '/user/:user_id',
  checkObjectId('user_id'),
  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        user: user_id
      }).populate('user', ['name', 'avatar']);

      if (!profile) return res.status(400).json({ msg: 'Profile not found' });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);
// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/',auth,async(req,res)=>{
  try{
    // Remove user posts
    // Remove profile
    // Remove user
    await Promise.all([
      Post.deleteMany({ user: req.user.id }),
      Profile.findOneAndRemove({ user: req.user.id }),
      User.findOneAndRemove({ _id: req.user.id })
    ]);
    res.json({msg:'User deleted'});
  }
  catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  
})
// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" }
    };
    request(options,(error,response,body)=>{
      if(error)
       console.log(error);
      if(response.statusCode!==200)
       res.status(404).json({msg:'No profile found'});
       res.json(JSON.parse(body));
    })
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: 'No Github profile found' });
  }
});

module.exports = router;