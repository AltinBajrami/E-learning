import { UnauthorizedError } from './CustomErrors.js';
import { UserRoles } from './constants.js';

const checkPermissions = (requestedUser, resourceUserId) => {
  if (requestedUser.role === UserRoles.SUPERADMIN) return;
  if (requestedUser && resourceUserId) {
    if (requestedUser.userId === resourceUserId.toString()) {
      return;
    }
  } else {
    console.error('requestedUser or resourceUserId is undefined');
  }

  throw new UnauthorizedError('Not authorized to access this route');
};

export default checkPermissions;
