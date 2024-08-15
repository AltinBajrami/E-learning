import { StatusCodes } from 'http-status-codes';
import Message from '../models/Message.js';
import Conversation from '../models/Conversation.js';
import { BadRequestError } from '../utils/CustomErrors.js';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createMessage = async (req, res) => {
  const { conversationId, text, senderId } = req.body;
  if (!conversationId || !senderId) {
    throw new BadRequestError(
      'Please provide conversationId,text and senderId'
    );
  }
  const conversation = await Conversation.findById(conversationId);
  if (!conversation) {
    throw new BadRequestError('Please provide a valid conversation');
  }

  let imagePath = null;
  console.log(req.files);

  if (req.files && req.files.image) {
    const image = req.files.image;
    const uploadPath = path.join(
      __dirname,
      `../public/uploads/messages/` + `${image.name}`
    );
    image.mv(uploadPath, err => {
      if (err) {
        throw new BadRequestError('Image upload failed');
      }
    });
    imagePath = `/uploads/messages/${image.name}`;
  }

  const message = await Message.create({
    conversationId,
    text,
    senderId,
    readBy: [senderId],
    image: imagePath,
  });
  await message.populate('senderId');
  return res.status(StatusCodes.OK).json({ msg: 'created', message });
};

export const getAllMessagesByConversationId = async (req, res) => {
  const { conversationId } = req.params;
  const conversation = await Conversation.findById(conversationId);
  if (!conversation) {
    throw new BadRequestError('Please provide a valid conversation');
  }
  const messages = await Message.find({ conversationId }).populate('senderId');
  return res.status(StatusCodes.OK).json({ messages });
};

export const markMessagesAsRead = async (req, res) => {
  const { conversationId } = req.params;
  const userId = req?.user?.userId;
  console.log(userId, req?.user);
  await Message.updateMany(
    {
      conversationId: new mongoose.Types.ObjectId(conversationId),
      readBy: { $ne: userId },
    },
    { $addToSet: { readBy: userId } }
  );

  res.status(StatusCodes.OK).json({ msg: 'Messages marked as read' });
};
