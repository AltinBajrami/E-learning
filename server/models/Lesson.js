import mongoose from 'mongoose';

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  class: {
    type: Number,
    required: true,
  },
  resources: {
    type: [String],
    default: [],
  },
});

const Lesson = mongoose.model('Lesson', LessonSchema);

export default Lesson;
