const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const melodySchema = new Schema({
  name: String,
  url: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Melody = mongoose.model('Melody', melodySchema);
module.exports = Melody;