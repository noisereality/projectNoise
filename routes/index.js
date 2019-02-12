const express = require('express');
const router  = express.Router();
const ensureLogin = require('connect-ensure-login')
const Xperience = require("../models/Xperience");

/* GET home page */
router.get('/', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  res.render('index');
});

router.get('/profile/:id', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next)=>{
  res.render('profile')
});

router.put('/profile', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next)=>{
  
});

router.get('/xperience', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next)=>{
  res.render('xperience')
});

router.post('/xperience/:idXperience', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next)=>{
  Xperience.findById(req.params.idXperience)
  .then(xperience => {
    console.log(xperience)
  })
  .catch(err => {
    console.log(err);
  })
  let xperience =
  Xperience.create()
});

router.put('/xperience/:id', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next)=>{
  
});

router.delete('/xperience/:id', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next)=>{
  
});

router.get('/xperience-list', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next)=>{
  res.render('xperience-list')
});

router.get('/users-list', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next)=>{
  res.render('users-list')
});



module.exports = router;
