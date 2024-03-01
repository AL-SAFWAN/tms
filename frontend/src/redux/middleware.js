import { isRejectedWithValue } from '@reduxjs/toolkit';
import { logout } from '../redux/slice/user';
/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (
      action.payload.status === 403 &&
      action.payload.data.detail === 'token has been expired'
    ) {
      console.warn('expired token found, logging out');
      api.dispatch(logout());
    }
  }

  return next(action);
};
