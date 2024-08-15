import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
    },
    readBy: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    emailSent: {
      type: Boolean,
      default: false,
    },
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model('Message', MessageSchema);
