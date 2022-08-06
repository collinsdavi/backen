const router = require('express').Router();
const User = require('../model/User');
const verify = require('./verifytoken');



router.get('/', verify, (req,res) => {
res.send(req.user);
// User.findbyOne({_id: req.user})
});


module.exports = router;
