import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const KidSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  tasks: {
    type: [String],
    required: true,
  },
});

const Kid = mongoose.model('Kid', KidSchema);
export default Kid;