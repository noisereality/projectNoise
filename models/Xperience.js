const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Sample = require("./Sample")

const xperienceSchema = new Schema({
  name: String,
  type: String,
  stars: Number,
  loops:[{
    sample: {type: Schema.Types.ObjectId, ref: 'Sample'},
    start:[]
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Xperience = mongoose.model('Xperience', xperienceSchema);
module.exports = Xperience;
