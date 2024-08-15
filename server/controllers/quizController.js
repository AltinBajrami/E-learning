import { StatusCodes } from 'http-status-codes';
import Quiz from '../models/Quiz.js';
import Submission from '../models/Submission.js';
import Class from '../models/Class.js';
import { BadRequestError, NotFoundError } from '../utils/CustomErrors.js';
import { UserRoles } from '../utils/constants.js';
import checkPermissions from '../utils/checkPermissions.js';
import { sendGradeEmail } from '../utils/sendGradeEmail.js';
import User from '../models/User.js';

const updateUserLevelAndExperience = async (user, gainedExp) => {
  user.experience += gainedExp;
  while (user.experience >= 100) {
    user.level += 1;
    user.experience -= 100;
  }
  await user.save();
};

export const createQuiz = async (req, res) => {
  const { role } = req.user;
  if (role !== UserRoles.TEACHER) {
    throw new BadRequestError('Role must be teacher');
  }

  const { title, description, questions, classId, startDate, endDate } =
    req.body;

  const quizExists = await Quiz.findOne({ classId });
  if (quizExists) {
    throw new BadRequestError(
      'Teacher already has a quiz for this class, you can update that quiz'
    );
  }

  if (!title || !description) {
    throw new BadRequestError('Please provide title and description');
  }
  if (!questions || questions.length < 1) {
    throw new BadRequestError(
      'Please provide at least 1 question with 4 options'
    );
  }

  for (const question of questions) {
    const { questionText, options, correctAnswersCount } = question;
    if (!questionText || !options || !correctAnswersCount) {
      throw new BadRequestError(
        'Please provide questionText, options, and correctAnswersCount for each question'
      );
    }
    if (options.length !== 4) {
      throw new BadRequestError('Please provide 4 options for each question');
    }
    let isCorrectCount = 0;
    for (const { text, isCorrect } of options) {
      if (!text) {
        throw new BadRequestError('Please provide option text');
      }
      isCorrectCount += isCorrect === true ? 1 : 0;
    }
    if (isCorrectCount !== correctAnswersCount) {
      throw new BadRequestError(
        'Correct answers count must match the options isCorrect count'
      );
    }
  }

  const classObj = await Class.findById(classId);
  if (!classObj) {
    throw new BadRequestError('Please provide a valid classId');
  }

  if (startDate >= endDate) {
    throw new BadRequestError('Start date should be before end date');
  }

  const quiz = await Quiz.create({
    title,
    description,
    questions,
    teacher: req.user.userId,
    classId: classObj._id,
    startDate,
    endDate,
  });

  return res.status(StatusCodes.CREATED).json({ msg: 'Quiz created!', quiz });
};

export const getAllQuizes = async (req, res) => {
  const quizes = await Quiz.find({}).populate('teacher');
  return res.status(StatusCodes.OK).json({ quizes });
};

export const getQuizById = async (req, res) => {
  const { id } = req.params;
  const quiz = await Quiz.findById(id).populate('teacher');
  if (!quiz) {
    throw new NotFoundError(`Quiz with id ${id} not found`);
  }
  return res.status(StatusCodes.OK).json({ quiz });
};

export const getAllQuizesFromTeacher = async (req, res) => {
  const { teacherId } = req.params;
  const quizes = await Quiz.find({ teacher: teacherId });
  return res.status(StatusCodes.OK).json({ quizes });
};

export const updateQuiz = async (req, res) => {
  const { title, description, questions, endDate, startDate } = req.body;
  const id = req.params.id;
  const quiz = await Quiz.findById(id);
  if (!quiz) {
    throw new NotFoundError(`Quiz with id ${id} not found`);
  }

  if (!title || !description) {
    throw new BadRequestError('Please provide title and description');
  }
  if (!questions || questions.length < 1) {
    throw new BadRequestError(
      'Please provide at least 1 question with 4 options'
    );
  }

  if (title !== quiz.title) {
    const existingQuiz = await Quiz.findOne({ title });
    if (existingQuiz) {
      throw new BadRequestError('Quiz with this title already exists');
    }
  }

  for (const question of questions) {
    const { questionText, options, correctAnswersCount } = question;
    if (!questionText || !options || !correctAnswersCount) {
      throw new BadRequestError(
        'Please provide questionText, options, and correctAnswersCount for each question'
      );
    }
    if (options.length !== 4) {
      throw new BadRequestError('Please provide 4 options for each question');
    }
    let isCorrectCount = 0;
    for (const { text, isCorrect } of options) {
      if (!text) {
        throw new BadRequestError('Please provide option text');
      }
      isCorrectCount += isCorrect === true ? 1 : 0;
    }
  }
  if (startDate >= endDate) {
    throw new BadRequestError('Start date should be before end date');
  }

  const updatedQuiz = await Quiz.findByIdAndUpdate(
    req.params.id,
    { title, description, questions, startDate, endDate },
    { new: true, runValidators: true }
  );

  return res.status(StatusCodes.OK).json({ msg: 'Quiz Updated!', updatedQuiz });
};

export const deleteQuiz = async (req, res) => {
  const id = req.params.id;
  const quiz = await Quiz.findById(id);

  if (!quiz) {
    throw new NotFoundError(`Quiz with id ${id} not found`);
  }

  checkPermissions(req.user, quiz.teacher);

  await quiz.deleteOne();
  return res.status(StatusCodes.OK).json({ msg: 'Quiz Deleted!' });
};

export const submitQuizAnswers = async (req, res) => {
  const { id } = req.params;
  const { answers } = req.body;
  const userId = req.user.userId;

  const quizAlreadySubmitted = await Submission.findOne({
    quiz: id,
    user: userId,
  });
  if (quizAlreadySubmitted) {
    throw new BadRequestError('You have already submitted this quiz');
  }

  const quiz = await Quiz.findById(id).populate('classId');
  if (!quiz) {
    throw new BadRequestError('Quiz not found');
  }

  const now = new Date();
  if (now > quiz.endDate) {
    throw new BadRequestError('Quiz has ended. You cannot submit it anymore.');
  }

  if (Object.entries(answers).length !== quiz.questions.length) {
    throw new BadRequestError('Please provide answers for the quiz');
  }

  if (!quiz.classId?.students?.includes(req.user.userId)) {
    throw new BadRequestError('You are not a student in this class');
  }

  const formattedAnswers = [];
  let totalCorrect = 0;

  for (const [questionIndex, selectedOptions] of Object.entries(answers)) {
    const question = quiz.questions[questionIndex];
    if (!question) {
      throw new BadRequestError(`Please answer all questions!`);
    }

    const isValidOption = Object.values(selectedOptions).some(
      (option) => option === true
    );
    if (!isValidOption) {
      throw new BadRequestError(
        `Questions must have at least one option selected`
      );
    }
    const selected = Object.entries(selectedOptions);

    let isCorrect = true;

    question.options.forEach((option, optionIndex) => {
      if (option.isCorrect !== selected[optionIndex][1]) {
        isCorrect = false;
      }
    });

    if (isCorrect) {
      totalCorrect++;
    }

    formattedAnswers.push({
      questionIndex: parseInt(questionIndex, 10),
      selectedOptions,
      isCorrect,
    });
  }

  const totalQuestions = quiz.questions.length;
  const grade = (totalCorrect / totalQuestions) * 100;

  const numberGrade = determineLetterGrade(grade);
  const user = await User.findById(req.user.userId);
  await sendGradeEmail({
    name: req.user.firstName,
    email: user.email,
    grade: numberGrade,
  });

  const submission = await Submission.create({
    quiz: id,
    user: userId,
    answers: formattedAnswers,
    totalCorrect,
    grade: numberGrade,
  });

  const gainedExp = grade >= 50 ? 50 : 25;
  await updateUserLevelAndExperience(user, gainedExp);

  res.status(StatusCodes.CREATED).json({ submission });
};

export const getAllSubmittedQuizFromClass = async (req, res) => {
  const { classId, quizId } = req.params;
  const classObj = await Class.findOne({ _id: classId });
  if (!classObj) {
    throw new NotFoundError(`Class with id ${classId} not found`);
  }
  const quiz = await Quiz.findOne({ _id: quizId });
  if (!quiz) {
    throw new NotFoundError(`Quiz with id ${quizId} not found`);
  }

  checkPermissions(req.user, quiz.teacher);

  const submittedQuizzes = await Submission.find({ quiz: quiz._id });
  return res.status(StatusCodes.OK).json({ submittedQuizzes });
};

const determineLetterGrade = (grade) => {
  if (grade >= 90) return '10';
  if (grade >= 80) return '9';
  if (grade >= 70) return '8';
  if (grade >= 60) return '7';
  if (grade >= 50) return '6';
  return '5';
};
