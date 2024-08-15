import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';
import { BadRequestError, NotFoundError } from '../utils/CustomErrors.js';
import path from 'path';
import { fileURLToPath } from 'url';
import checkPermissions from '../utils/checkPermissions.js';
import fs from 'fs';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createConversation = async (req, res) => {
  let { members, groupName } = req.body;

  const doesExist = await Conversation.findOne({ members });
  if (doesExist) {
    throw new BadRequestError('Already exist');
  }

  const users = await User.find({ _id: { $in: members } });
  if (users.length !== members.length) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'One or more members do not exist' });
  }

  const data = {
    members,
    admin: req.user.userId,
    groupName,
  };

  const photo = req?.files?.photo;

  if (req.files && photo) {
    const maxSize = 1024 * 1024;
    if (photo.size > maxSize) {
      throw new BadRequestError('Please upload  image smaller than 1MB');
    }

    const imagePath = path.join(
      __dirname,
      `../public/uploads/chatGroup/` + `${photo.name}`
    );
    await photo.mv(imagePath);
    data.photo = `/uploads/users/${photo.name}`;
  }

  const conversation = await Conversation.create(data);

  return res
    .status(StatusCodes.OK)
    .json({ msg: 'Created conversation', conversation });
};
export const getAllConversationsByUser = async (req, res) => {
  const userId = req.user.userId;

  const conversations = await Conversation.aggregate([
    {
      $match: { members: new mongoose.Types.ObjectId(userId) },
    },
    {
      $lookup: {
        from: 'messages', // The name of the Message collection
        localField: '_id',
        foreignField: 'conversationId',
        as: 'messages',
      },
    },
    {
      $addFields: {
        lastMessage: {
          $arrayElemAt: [
            { $sortArray: { input: '$messages', sortBy: { createdAt: -1 } } },
            0,
          ],
        },
      },
    },
    {
      $sort: { 'lastMessage.createdAt': -1 },
    },
    {
      $lookup: {
        from: 'users', // The name of the User collection
        localField: 'members',
        foreignField: '_id',
        as: 'members',
      },
    },
    {
      $project: {
        members: { _id: 1, firstName: 1, lastName: 1, email: 1, avatar: 1 },
        admin: 1,
        photo: 1,
        groupName: 1,
        lastMessage: 1,
      },
    },
  ]);
  return res.status(StatusCodes.OK).json({ conversations });
};

export const getSingleConversation = async (req, res) => {
  const conversation = await Conversation.findById(req.params.id).populate(
    'members'
  );
  if (!conversation) {
    throw new NotFoundError('Conversation not found');
  }
  checkPermissions(req.user, conversation.admin);
  return res.status(StatusCodes.OK).json({ conversation });
};

export const editConversation = async (req, res) => {
  let { members, groupName } = req.body;
  const conversation = await Conversation.findById(req.params.id);
  if (!conversation) {
    throw new NotFoundError('Conversation not found');
  }

  const users = await User.find({ _id: { $in: members } });
  if (users.length !== members.length) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'One or more members do not exist' });
  }

  const data = {
    members,
    admin: req.user.userId,
    groupName,
  };

  const photo = req?.files?.photo;

  if (req.files && photo) {
    const maxSize = 1024 * 1024;
    if (photo.size > maxSize) {
      throw new BadRequestError('Please upload  image smaller than 1MB');
    }

    const imagePath = path.join(
      __dirname,
      `../public/uploads/chatGroup/` + `${photo.name}`
    );
    await photo.mv(imagePath);
    data.photo = `/uploads/chatGroup/${photo.name}`;

    if (conversation.photo !== `/uploads/chatGroup/groupImage.jpg`) {
      const oldImagePath = path.join(
        __dirname,
        '../public',
        conversation.photo
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
  }

  const newConversation = await Conversation.findByIdAndUpdate(
    req.params.id,
    data,
    { runValidators: true, new: true }
  );

  return res
    .status(StatusCodes.OK)
    .json({ msg: 'Created conversation', conversation: newConversation });
};

export const deleteConversation = async (req, res) => {
  const conversation = await Conversation.findById(req.params.id);
  if (!conversation) {
    throw new NotFoundError('Conversation not found');
  }

  if (req.user.userId === conversation.admin.toString()) {
    await conversation.deleteOne();
    await Message.deleteMany({ conversationId: conversation._id });
    res
      .status(StatusCodes.OK)
      .json({ msg: 'Successfully removed conversation' });
  } else {
    conversation.members = conversation.members.filter(
      m => m.toString() !== req.user.userId
    );
    await conversation.save();
    res
      .status(StatusCodes.OK)
      .json({ msg: 'Successfully left the conversation' });
  }
};
