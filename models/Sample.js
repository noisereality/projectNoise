const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const sampleSchema = new Schema({
  name: String,
  url: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Sample = mongoose.model('Sample', sampleSchema);
module.exports = Sample;