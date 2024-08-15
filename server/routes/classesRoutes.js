import express from 'express';
import {
  getClasses,
  getSingleClass,
  createClass,
  updateClass,
  deleteClass,
  editStudents,
  addTopic,
  updateTopic,
  deleteTopic,
  addMeetLink,
  deleteMeetLink,
  updateMeetLink,
} from '../controllers/classesController.js';
import {
  authenticateUser,
  authorizePermissions,
} from '../middlewares/authentication.js';
import { UserRoles } from '../utils/constants.js';

const router = express.Router();

router
  .route('/')
  .post(
    [authenticateUser, authorizePermissions(UserRoles.SUPERADMIN)],
    createClass
  )
  .get(authenticateUser, getClasses);

router
  .route('/:id')
  .get(getSingleClass)
  .patch(
    [authenticateUser, authorizePermissions(UserRoles.SUPERADMIN)],
    updateClass
  )
  .delete(
    [authenticateUser, authorizePermissions(UserRoles.SUPERADMIN)],
    deleteClass
  );

router.put(
  '/:id/edit-students',
  [authenticateUser, authorizePermissions(UserRoles.SUPERADMIN)],
  editStudents
);
router.post(
  '/:id/topics',
  authenticateUser,
  authorizePermissions(UserRoles.TEACHER, UserRoles.SUPERADMIN),
  addTopic
);
router.patch(
  '/:id/topics/:topicId',
  authenticateUser,
  authorizePermissions(UserRoles.TEACHER, UserRoles.SUPERADMIN),
  updateTopic
);

router.delete(
  '/:id/topics/:topicId',
  authenticateUser,
  authorizePermissions(UserRoles.TEACHER, UserRoles.SUPERADMIN),
  deleteTopic
);

router.post(
  '/:classId/topics/:topicId/meetLink',
  authenticateUser,
  authorizePermissions(UserRoles.TEACHER),
  addMeetLink
);
router.patch(
  '/:classId/topics/:topicId/meetLink',
  authenticateUser,
  authorizePermissions(UserRoles.TEACHER),
  updateMeetLink
);
router.delete(
  '/:classId/topics/:topicId/meetLink',
  authenticateUser,
  authorizePermissions(UserRoles.TEACHER),
  deleteMeetLink
);
export default router;
