import { StatusCodes } from 'http-status-codes';
import Notification from '../models/Notification.js';
import checkPermissions from '../utils/checkPermissions.js';

export const getAllNotifications = async (req, res) => {
  const notifications = await Notification.find({
    receiverId: req.user.userId,
  })
    .populate('senderId')
    .sort({ timestamp: -1 });
  return res.status(StatusCodes.OK).json({ notifications });
};

export const deleteNotificatonsById = async (req, res) => {
  const { notificationId } = req.params;
  const notification = await Notification.findById(notificationId);
  if (!notification) {
    throw new NotFoundError('Notification not found');
  }

  checkPermissions(req.user, notification.receiverId);
  await notification.deleteOne();
  return res
    .status(StatusCodes.OK)
    .json({ msg: 'Notification deleted successfully!' });
};

export const deleteAllNotificatons = async (req, res) => {
  const notification = await Notification.deleteMany({
    receiverId: req.user.userId,
  });
  return res
    .status(StatusCodes.OK)
    .json({ msg: 'Notification deleted successfully!' });
};
