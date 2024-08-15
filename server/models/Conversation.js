import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    admin: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    photo: {
      type: String,
      default: '/uploads/chatGroup/groupImage.jpg',
    },
    groupName: String,
  },
  { timestamps: true }
);

export default mongoose.model('Conversation', ConversationSchema);
