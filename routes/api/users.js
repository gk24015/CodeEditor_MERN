//for registering the user
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const User = require('../../models/User');

//GET api/users
//

router.post('/',
 check('name','Name is required')
     .not()
     .isEmpty(),
    check('email','Please include valid email').isEmail(),
    check('password','Please put a valid passport(6 or more)').isLength({
        min:6})

,
async(req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    console.log(req.body);
    //check if user exist
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
    //get user avatar
    const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        }),
        { forceHttps: true }
      );
    //encrypt password
    user = new User({
        name,
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
    //return jsonwebtoken
    
    const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
  //  res.send('User route');
  //  console.log(req.body);
});



module.exports = router;