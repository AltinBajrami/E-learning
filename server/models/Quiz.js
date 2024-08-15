import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true, default: false },
});

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: {
    type: [optionSchema],
  },
  correctAnswersCount: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4],
  },
});

const QuizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: { type: [questionSchema], required: true },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    startDate: { type: Date, required: false, default: Date.now() },
    endDate: {
      type: Date,
      required: false,
      default: Date.now() + 60 * 1000 * 60,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Quiz', QuizSchema);
