import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  questionIndex: { type: Number, required: true },
  selectedOptions: { type: Map, of: Boolean, required: true },
  isCorrect: { type: Boolean, required: true },
});

const SubmissionSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  answers: [answerSchema],
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  totalCorrect: { type: Number, required: true },
  grade: Number,
});

export default mongoose.model('Submission', SubmissionSchema);
