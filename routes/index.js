const express = require('express');
const router  = express.Router();
const ensureLogin = require('connect-ensure-login')
const Xperience = require("../models/Xperience");
const User = require('../models/User')

const bcrypt = require("bcrypt");
const bcryptSalt = 10;


/* GET home page */
router.get('/', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  res.render('index');
});

router.get('/profile', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) =>  {
  User.findById(req.user._id)
    .then(user => {
      res.render('profile', {user})
    })
    .catch(error => {
      console.log(error)
    })
})

router.get('/profile/:id', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next)=>{
    User.findById(req.params.id)
    .then(user => {
      let editable = false
      if (user.id == req.user.id){
          editable = true
      }
      console.log(editable)
      res.render('profile', {user, editable})
    })
    .catch(error => {
      console.log(error)
    })
});

router.post('/profile', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next)=>{
  let username = req.body.username
  let password = req.body.password
  
  if (username === "" || password === "") {
    res.render("profile", { message: "Indicate username and password" });
    return;
  }
  
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);
  
  const profileUpdate = {
    username,
    password: hashPass
  }
  User.findByIdAndUpdate(req.user._id, profileUpdate)
  .then(users => {
  res.render('profile', {users})
  })
  .catch(error => {
  console.log(error)
  });
})

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
  Xperience.find(req.body.xperiences)
  .then(xperience => {
    res.render('xperience-list', {xperience})
  })
  .catch(error => {
    console.log(error)
  })
});

router.get('/users-list', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next)=>{
  User.find(req.user.users)
  .then(user => {
    res.render('users-list', {user})
  })
  .catch(error => {
    console.log(error)
  })
});

module.exports = router;
