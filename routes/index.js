const express = require('express');
const router  = express.Router();
const ensureLogin = require('connect-ensure-login')

/* GET home page */
router.get('/', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  res.render('index');
});

router.get('/profile/:id', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next)=>{
  res.render('profile')
});

router.put('/profile/:id', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next)=>{
  
});

router.get('/xperience', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next)=>{
  res.render('xperience')
});

module.exports = router;
