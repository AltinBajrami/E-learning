import mongoose from 'mongoose';

const TopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  meetLink: {
    type: String,
    required: false,
  },
  startTime: {
    type: Date,
    required: false,
  },
  endTime: {
    type: Date,
    required: false,
  },
});

const ClassSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  instructor: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  students: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  topics: [TopicSchema],
  conversationId: {
    type: mongoose.Types.ObjectId,
    ref: 'Conversation',
  },
});

export default mongoose.model('Class', ClassSchema);
