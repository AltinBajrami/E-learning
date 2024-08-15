import express from 'express';
import {
  addAvatar,
  getAllUsers,
  showCurrentUser,
  updateUser,
  addKid,
  acceptParentRequest,
  rejectParentRequest,
  getUsersLoggedIn24Hours,
  getUsersBasedOnRole,
} from '../controllers/userController.js';
import {
  authenticateUser,
  authorizePermissions,
} from '../middlewares/authentication.js';
import { UserRoles } from '../utils/constants.js';

const router = express.Router();

router.get('/', authenticateUser, getAllUsers);
router.get('/current-user', authenticateUser, showCurrentUser);
router.post('/add-avatar', authenticateUser, addAvatar);
router.patch('/update-user', authenticateUser, updateUser);
router.post(
  '/add-kid',
  authenticateUser,
  authorizePermissions(UserRoles.PARENT),
  addKid
);
router.post(
  '/accept-parent-request',
  authenticateUser,
  authorizePermissions(UserRoles.STUDENT),
  acceptParentRequest
);
router.post(
  '/reject-parent-request',
  authenticateUser,
  authorizePermissions(UserRoles.STUDENT),
  rejectParentRequest
);

router.get(
  '/users-logged-in-24-hours',
  authenticateUser,
  getUsersLoggedIn24Hours
);
router.get('/users-based-on-role', authenticateUser, getUsersBasedOnRole);
export default router;
