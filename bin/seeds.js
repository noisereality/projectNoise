// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Sample = require("../models/Sample");
const Xperience = require("../models/Xperience");


const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/noise-reality', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let samples = [
  {
    name: "kick",
    url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/808-kick-vh.mp3"
  },
  {
    name: "snare",
    url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/flares-snare-vl.mp3"
  },
  {
    name: "clap",
    url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/909-clap-vm.mp3"
  }
  {
    name: "hat",
    url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/808-hihat-vm.mp3"
  }
]

Sample.deleteMany()
  .then(() => {
    return Sample.create(samples)
  })
  .then(samplesCreated => {
    const sample1 = samplesCreated[0]._id
    const sample2 = samplesCreated[1]._id
    const sample3 = samplesCreated[2]._id
    const sample4 = samplesCreated[3]._id

    let xperiences = [
      {
        name: "eibisa",
        type: "house",
        stars: 3,
        loops: [{
          sample: sample1,
          start: [0, 2, 4, 6, 8, 10, 12, 14]
        }]
      },
      {
        name: "noise trip",
        type: "electro",
        stars: 5,
        loops: [{
          sample: sample1,
          start: [0, 4, 8, 12]
        },
        {
          sample: sample2,
          start: [0, 8]
        },
        {
          sample: sample3,
          start: [1,2,3,4]
        },
        {
          sample: sample4,
          start: [2, 6, 10, 14]
        }]
      },
      {
        name: "atunconpan",
        type: "techno",
        stars: 4,
        loops: [{
          sample: sample1,
          start: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
        },
        {
          sample: sample2,
          start: [1,2, 3, 5, 7, 9, 10]
        }]
      }
    ]

    Xperience.deleteMany()
      .then(() => {
        return Xperience.create(xperiences)
      })
      .then(xperiencesCreated => {
        console.log(`${xperiencesCreated.length} xperience created`);
        const xperienceCreated1 = xperiencesCreated[0]._id
        const xperienceCreated2 = xperiencesCreated[1]._id
        const xperienceCreated3 = xperiencesCreated[2]._id

        let users = [
          {
            username: "dani",
            password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
            email: "dani@test.es",
            xperiences: [xperienceCreated1,xperienceCreated2]
          },
          {
            username: "alvaro",
            password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
            email: "dani@test.es",
            xperiences: [xperienceCreated3]
          }
        ]
        
        User.deleteMany()
        .then(() => {
          return User.create(users)
        })
        .then(usersCreated => {
          console.log(`${usersCreated.length} users created with the following id:`);
          console.log(usersCreated.map(u => u._id));
        })
        .then(() => {
          // Close properly the connection to Mongoose
          mongoose.disconnect()
        })
        .catch(err => {
          mongoose.disconnect()
          throw err
        })
      })  
  })





