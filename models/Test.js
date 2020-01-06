const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  birthyear: {
    type: Number,
    required: true,
  }
});

module.exports = Test = mongoose.model('test', TestSchema);
