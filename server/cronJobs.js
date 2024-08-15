import cron from 'node-cron';
import User from './models/User.js';
import Conversation from './models/Conversation.js';
import Message from './models/Message.js';
import { sendReminderEmail } from './utils/sendReminderEmail.js';

cron.schedule('* * * * *', async () => {
  try {
    const conversations = await Conversation.aggregate([
      {
        $lookup: {
          from: 'messages',
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
          from: 'users',
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

    for (const conversation of conversations) {
      const lastMessage = conversation?.lastMessage;
      if (!lastMessage) continue;

      if (lastMessage.emailSent) continue;

      const givenTime = new Date(lastMessage.createdAt);
      const currentTime = Date.now();
      const fiveMinutesAgo = currentTime - 5 * 60 * 1000;

      const readByIds = lastMessage?.readBy?.map(id => id.toString());

      if (givenTime.getTime() < fiveMinutesAgo) {
        for (const member of conversation.members) {
          if (!readByIds?.includes(member._id.toString())) {
            const sender = await User.findById(lastMessage.senderId);
            await sendReminderEmail({
              name: member.firstName,
              email: member.email,
              senderName: sender.firstName,
            });
            await Message.findByIdAndUpdate(lastMessage._id, {
              $set: { emailSent: true },
            });
          }
        }
      }
    }
  } catch (error) {
    console.error('Error checking unread messages:', error);
  }
});
