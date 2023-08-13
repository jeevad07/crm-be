const mongoose = require('mongoose');
const { Schema } = mongoose;

const CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 100000 }
});

CounterSchema.pre('save', function (next) {
    if (this.isNew && typeof this.seq !== 'number') {
      this.seq = 100000;
    }
    next();
  });
const counterModel = mongoose.model('counter', CounterSchema);

module.exports = counterModel;