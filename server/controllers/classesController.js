import { StatusCodes } from 'http-status-codes';
import Class from '../models/Class.js';
import User from '../models/User.js';
import { BadRequestError, NotFoundError } from '../utils/CustomErrors.js';
import { UserRoles } from '../utils/constants.js';
import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';
import Quiz from '../models/Quiz.js';
import { sendTeacherEmailForClass } from '../utils/sendTeacherEmailForClass.js';

const createClass = async (req, res) => {
  const { title, instructorId, description } = req.body;

  if (!title || !instructorId) {
    throw new BadRequestError('Title and instructorId are required');
  }

  const instructor = await User.findById(instructorId);
  if (!instructor || instructor.role !== UserRoles.TEACHER) {
    throw new BadRequestError('Instructor must be a valid id and teacher');
  }
  const conversation = await Conversation.create({
    groupName: title,
    admin: instructorId,
    members: [instructorId],
  });
  await sendTeacherEmailForClass({
    name: instructor.firstName,
    email: instructor.email,
    className: title,
  });
  const classObj = await Class.create({
    title,
    instructor,
    description,
    conversationId: conversation._id,
  });
  return res.status(StatusCodes.CREATED).json({ class: classObj });
};

const editStudents = async (req, res) => {
  let { students } = req.body;
  const classId = req.params.id;

  const classObj = await Class.findById(classId);
  if (!classObj) {
    throw new NotFoundError(`Class with id ${classId} not found`);
  }

  if (!students || students.length === 0) {
    throw new BadRequestError('Please provide at least one student');
  }
  students = students.map(s => s._id);
  const existingStudents = await User.find({ _id: { $in: students } });

  if (existingStudents.length !== students.length) {
    throw new BadRequestError('One or more student IDs are invalid');
  }

  existingStudents.forEach(student => {
    if (student.role !== UserRoles.STUDENT) {
      throw new BadRequestError('Please add only students');
    }
  });

  const conversation = await Conversation.findById(classObj.conversationId);
  classObj.students = students;
  conversation.members = [...students, classObj.instructor];
  await classObj.save();
  await conversation.save();
  return res
    .status(StatusCodes.OK)
    .json({ msg: 'students added', class: classObj });
};

const getClasses = async (req, res) => {
  let classesObj;
  const { role } = req.user;
  if (role === UserRoles.SUPERADMIN) {
    classesObj = await Class.find({}).populate('instructor students');
  } else if (role === UserRoles.TEACHER) {
    classesObj = await Class.find({ instructor: req.user.userId }).populate(
      'instructor students'
    );
  } else
    classesObj = await Class.find({ students: req.user.userId }).populate(
      'instructor students'
    );
  return res.status(StatusCodes.OK).json({ classes: classesObj });
};

const getSingleClass = async (req, res) => {
  const classObj = await Class.findById(req.params.id).populate(
    'instructor students'
  );
  if (!classObj) {
    throw new NotFoundError(`Class with id ${req.params.id} not found`);
  }
  const quiz = await Quiz.findOne({ classId: classObj._id });

  return res.status(StatusCodes.OK).json({ class: classObj, quiz });
};
const updateClass = async (req, res) => {
  const { title, instructorId } = req.body;

  const classObj = await Class.findById(req.params.id);
  if (!classObj) {
    throw new NotFoundError(`Class with id ${req.params.id} not found`);
  }

  if (!title || !instructorId) {
    throw new BadRequestError('Title and instructorId are required');
  }

  const instructor = await User.findById(instructorId);
  if (!instructor || instructor.role !== UserRoles.TEACHER) {
    throw new BadRequestError('Instructor must be a valid id and teacher');
  }

  const conversation = await Conversation.findById(classObj.conversationId);
  if (!conversation) {
    throw new NotFoundError(
      `Conversation with id ${classObj.conversationId} not found`
    );
  }

  conversation.groupName = title;
  conversation.admin = instructor._id;
  conversation.members = [...classObj.students, instructor._id];
  classObj.title = title;
  classObj.instructor = instructor._id;

  await classObj.save();
  await conversation.save();

  await sendTeacherEmailForClass({
    name: instructor.firstName,
    email: instructor.email,
    className: title,
  });
  return res.status(StatusCodes.OK).json({ class: classObj });
};

const deleteClass = async (req, res) => {
  const classObj = await Class.findById(req.params.id);
  if (!classObj) {
    throw new NotFoundError(`Class with id ${req.params.id} not found`);
  }
  await Conversation.findByIdAndDelete(classObj.conversationId);
  await Message.deleteMany({ conversationId: classObj.conversationId });
  await classObj.deleteOne();
  return res.status(StatusCodes.OK).json({ msg: 'Deleted successfully' });
};

const addTopic = async (req, res) => {
  const { topic } = req.body;
  const { id } = req.params;
  const classObj = await Class.findById(id);

  if (!classObj) {
    throw new NotFoundError(`Class with id ${id} not found`);
  }

  classObj.topics.push({ title: topic });
  await classObj.save();
  return res.status(StatusCodes.OK).json({ msg: 'Topic added', classObj });
};

const updateTopic = async (req, res) => {
  const { topic } = req.body;
  const { id, topicId } = req.params;
  const classObj = await Class.findById(id);

  if (!classObj) {
    throw new NotFoundError(`Class with id ${id} not found`);
  }

  const topicIndex = classObj.topics.findIndex(t => t._id.equals(topicId));

  if (topicIndex === -1) {
    throw new NotFoundError(`Topic with id ${topicId} not found`);
  }

  classObj.topics[topicIndex].title = topic;
  await classObj.save();
  return res.status(StatusCodes.OK).json({ msg: 'Topic added', classObj });
};

const deleteTopic = async (req, res) => {
  const { id, topicId } = req.params;
  const classObj = await Class.findById(id);

  if (!classObj) {
    throw new NotFoundError(`Class with id ${id} not found`);
  }

  const topicIndex = classObj.topics.findIndex(t => t._id.equals(topicId));

  if (topicIndex === -1) {
    throw new NotFoundError(`Topic with id ${topicId} not found`);
  }

  classObj.topics.splice(topicIndex, 1); // Remove the topic from the array

  await classObj.save();

  return res.status(StatusCodes.OK).json({ msg: 'Topic deleted', classObj });
};

const addMeetLink = async (req, res) => {
  const { classId, topicId } = req.params;
  const { meetLink, startTime, endTime } = req.body;
  console.log(classId, topicId);

  if (!meetLink || !startTime || !endTime) {
    throw new BadRequestError('All fields are required');
  }
  const classObj = await Class.findById(classId);
  if (!classObj) {
    throw new NotFoundError(`Class with id ${classId} not found`);
  }

  const topic = classObj.topics.id(topicId);
  if (!topic) {
    throw new NotFoundError(`Topic with id ${topicId} not found`);
  }
  topic.meetLink = meetLink;
  topic.startTime = startTime;
  topic.endTime = endTime;
  await classObj.save();

  return res.status(StatusCodes.OK).json({ msg: 'Meet link added', classObj });
};

const updateMeetLink = async (req, res) => {
  const { classId, topicId } = req.params;
  const { meetLink, startTime, endTime } = req.body;
  if (!meetLink || !startTime || !endTime) {
    throw new BadRequestError('All fields are required');
  }
  const classObj = await Class.findById(classId);
  if (!classObj) {
    throw new NotFoundError(`Class with id ${classId} not found`);
  }

  const topic = classObj.topics.id(topicId);
  if (!topic) {
    throw new NotFoundError(`Topic with id ${topicId} not found`);
  }

  topic.meetLink = meetLink;
  topic.startTime = startTime;
  topic.endTime = endTime;
  await classObj.save();

  return res
    .status(StatusCodes.OK)
    .json({ msg: 'Meet link updated', classObj });
};

const deleteMeetLink = async (req, res) => {
  const { classId, topicId } = req.params;

  const classObj = await Class.findById(classId);
  if (!classObj) {
    throw new NotFoundError(`Class with id ${classId} not found`);
  }

  const topic = classObj.topics.id(topicId);
  if (!topic) {
    throw new NotFoundError(`Topic with id ${topicId} not found`);
  }

  topic.meetLink = undefined;
  topic.startTime = undefined;
  topic.endTime = undefined;
  await classObj.save();
  console.log(classObj);

  return res
    .status(StatusCodes.OK)
    .json({ msg: 'Meet link deleted', classObj });
};

export {
  createClass,
  getClasses,
  getSingleClass,
  updateClass,
  deleteClass,
  editStudents,
  addTopic,
  updateTopic,
  deleteTopic,
  addMeetLink,
  updateMeetLink,
  deleteMeetLink,
};
