const express = require('express');
const router  = express.Router();
const ensureLogin = require('connect-ensure-login')
const Xperience = require("../models/Xperience");
const User = require('../models/User')
const Sample = require('../models/Sample')
const Melody = require('../models/Melody')

const bcrypt = require("bcrypt");
const bcryptSalt = 10;


/* GET home page */
router.get('/', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  res.render('index');
});

router.get('/profile', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) =>  {
  User.findById(req.user._id).populate("xperiences")
  .then(user => {
    let editable = false
    if (user.id == req.user.id){
      editable = true
    }
    res.render('profile', {user, editable})
  })
  .catch(error => {
    console.log(error)
  })
})

router.get('/profile/:id', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next)=>{
  User.findById(req.params.id).populate("xperiences")
  .then(user => {
    console.log(user.xperiences)
    let xperiences = user.xperiences
    let editable = false
    if (user.id == req.user.id){
      editable = true
    }
    res.render('profile', {user, editable, xperiences})
  })
  .catch(error => {
    console.log(error)
  })
});

router.post('/profile', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next)=>{
  let username = req.body.username
  let password = req.body.password
  
  if (username !== null) {
    res.render("profile", { message: "The username already exists" });
    return;
  }
  
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
  var enableSave = true;
  Melody.find()
  .then(melodies => {
    Sample.find().then(samples =>{
        res.render('xperience',{xperience: "undefined", samples: JSON.stringify(samples),
         xperienceName: JSON.stringify(req.query.xperienceName), melodies: JSON.stringify(melodies),
         enableSave: JSON.stringify(enableSave)})
    }).catch(err => {
      console.log(err);
    })
  })
});

router.get('/xperience/:idXperience', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next)=>{
  var enableSave = false;
  Melody.find()
  .then(melodies => {
    Sample.find().then(samples =>{
      Xperience.findById(req.params.idXperience)
      .populate("loops.sample")
      .then(xperience => {
        if(req.user._id == xperience.creator){
          enableSave=true
        }
        res.render('xperience',{xperience: JSON.stringify(xperience), samples: JSON.stringify(samples),
          xperienceName: JSON.stringify(xperience.name), melodies: JSON.stringify(melodies),
          enableSave: JSON.stringify(enableSave)})
      })
      .catch(err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
    })
  })
});

router.put('/xperience/:idXperience', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next)=>{
  Xperience.findById(req.params.idXperience)
  .then(xperience => {
    res.render('xperience',{xperience: JSON.stringify(xperience)})
  })
  .catch(err => {
    console.log(err);
  })
  let xperience =
  Xperience.create()
});

router.post('/xperience', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next)=>{
  req.body.xperience.creator = req.user._id
  Xperience.create(req.body.xperience)
  .then(xperience => {
    User.findById(req.user._id).populate("xperiences")
    .then(user => {
      let arrayXperiences = user.xperiences
      arrayXperiences.push(xperience._id)
      User.findByIdAndUpdate(req.user._id, {xperiences:arrayXperiences})
      .then(users => {
        console.log("ok")
      })
      .catch(error => {
      console.log(error)
      });
    })
    .catch(error => {
      console.log(error)
    })
  }).catch(error => {
    console.log(error)
  })


  
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
