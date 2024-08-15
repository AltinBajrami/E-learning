import PDFDocument from 'pdfkit';
import { sendEmail } from '../utils/sendEmail.js';
import User from '../models/User.js';
import Quiz from '../models/Quiz.js';
import Class from '../models/Class.js';
import Submission from '../models/Submission.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../utils/CustomErrors.js';
import convertStreamToBuffer from '../utils/streamToBuffer.js';

export const getCompletedQuizzes = async (req, res) => {
  const userId = req.user.userId;

  try {
    const completedQuizzes = await Submission.find({ user: userId }).populate(
      'quiz'
    );
    const user = await User.findById(userId);

    const response = completedQuizzes.map((submission) => ({
      quizId: submission.quiz._id,
      quizTitle: submission.quiz.title,
      classTitle: submission.quiz.classId.title,
    }));

    res.status(StatusCodes.OK).json({
      completedQuizzes: response,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        parentName: user.parentName,
        teacherName: user.teacherName,
        uniqueKeyForStudent: user.uniqueKeyForStudent,
      },
    });
  } catch (error) {
    console.error('Error fetching completed quizzes:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: 'Error fetching completed quizzes',
    });
  }
};

export const generateCertificate = async (req, res) => {
  const { selectedQuiz, firstName, lastName, parentName, uniqueKeyForStudent } =
    req.body;
  const userId = req.user.userId;

  try {
    console.log('Generating certificate for user:', userId);
    const user = await User.findById(userId);
    const quiz = await Quiz.findById(selectedQuiz).populate('classId');
    const classObj = await Class.findById(quiz.classId._id).populate(
      'instructor'
    );

    if (!user || !quiz || !classObj) {
      console.error('Invalid user, quiz, or class information');
      throw new BadRequestError('Invalid user, quiz, or class information');
    }

    const studentName = `${firstName} ${lastName}`;
    const teacherName = `${classObj.instructor.firstName} ${classObj.instructor.lastName}`;
    const courseTitle = quiz.title;
    const date = new Date().toLocaleDateString();

    const doc = new PDFDocument();

    doc.fontSize(25).text('Certificate of Completion', { align: 'center' });
    doc.moveDown();
    doc.fontSize(20).text('Congratulations', { align: 'center' });
    doc.fontSize(20).text(`${studentName}`, { align: 'center' });
    doc.moveDown();
    doc
      .fontSize(15)
      .text('for successfully completing the course', { align: 'center' });
    doc.fontSize(20).text(`${courseTitle}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(15).text('Under the guidance of', { align: 'center' });
    doc.fontSize(20).text(`${teacherName}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(15).text(`Date: ${date}`, { align: 'center' });

    doc.end();

    const pdfBuffer = await convertStreamToBuffer(doc);

    console.log('Sending email to:', user.email);

    await sendEmail({
      to: user.email,
      subject: 'Your Course Completion Certificate',
      html: '<p>Congratulations! Please find your course completion certificate attached.</p>',
      attachments: [
        {
          filename: 'certificate.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    });

    console.log('Certificate sent successfully to:', user.email);
    res
      .status(StatusCodes.OK)
      .json({ msg: 'Certificate generated and sent to your email' });
  } catch (error) {
    console.error('Error generating/sending certificate:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: 'Error generating/sending certificate',
      error: error.message,
    });
  }
};
