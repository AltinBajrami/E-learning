import { Server as socketIo } from 'socket.io';
import Conversation from './models/Conversation.js';
import User from './models/User.js';
import Notification from './models/Notification.js';
import { BadRequestError } from './utils/CustomErrors.js';

const setupSocket = server => {
  const io = new socketIo(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', socket => {
    console.log('New client connected');

    socket.on('joinChat', ({ userId }) => {
      socket.join(userId);
      console.log(`User ${userId} joined their personal chat room`);
    });

    socket.on(
      'sendMessage',
      async ({ senderId, conversationId, text, image }) => {
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
          throw new BadRequestError('Please provide a valid conversation id');
        }
        const members = conversation.members.filter(m => senderId !== m._id);
        const sender = await User.findById(senderId);

        for (const member of members) {
          io.to(member.toString()).emit('getMessage', {
            senderId: sender,
            text,
            createdAt: new Date(),
            conversationId: conversation._id,
            image: image ? true : false,
          });
        }

        io.to(senderId).emit('getMessage', {
          senderId,
          text,
          createdAt: new Date(),
        });
      }
    );

    socket.on(
      'sendNotification',
      async ({ receiverId, type, senderId, groupName }) => {
        console.log(groupName || 'no group');
        await Notification.create({
          senderId,
          receiverId,
          type,
          groupName,
        });
        const sender = await User.findById(senderId);

        io.to(receiverId).emit('getNotification', {
          senderId: sender,
          receiverId,
          type,
          groupName,
        });
      }
    );

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};

export default setupSocket;
