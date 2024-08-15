import express from 'express';
import {
  getAllQuizes,
  createQuiz,
  getAllQuizesFromTeacher,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  submitQuizAnswers,
  getAllSubmittedQuizFromClass,
} from '../controllers/quizController.js';
import {
  authenticateUser,
  authorizePermissions,
} from '../middlewares/authentication.js';
import { UserRoles } from '../utils/constants.js';

const router = express.Router();

router
  .route('/')
  .get(getAllQuizes)
  .post(
    [authenticateUser, authorizePermissions(UserRoles.TEACHER)],
    createQuiz
  );

router.get('/teacher/:teacherId', getAllQuizesFromTeacher);

router
  .route('/:id')
  .get(getQuizById)
  .patch(
    [
      authenticateUser,
      authorizePermissions(UserRoles.TEACHER, UserRoles.SUPERADMIN),
    ],
    updateQuiz
  )
  .delete(
    [
      authenticateUser,
      authorizePermissions(UserRoles.SUPERADMIN, UserRoles.TEACHER),
    ],
    deleteQuiz
  );

router.post('/:id/answers', authenticateUser, submitQuizAnswers);

router.get(
  '/class/:classId/quiz/:quizId/submissions',
  [authenticateUser, authorizePermissions(UserRoles.TEACHER)],
  getAllSubmittedQuizFromClass
);

router.post(
  '/:classId/answers/:quizId',
  [authenticateUser, authorizePermissions(UserRoles.TEACHER)],
  getAllSubmittedQuizFromClass
);

export default router;
