import { isRejectedWithValue, isFulfilled } from '@reduxjs/toolkit';
import { logout } from '../redux/slice/user';
import toast from 'react-hot-toast';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.log(action);
    if (
      action?.type !== 'authApi/executeMutation/rejected' &&
      action.payload.status === 404
    )
      toast(action.payload.data.detail, {
        className: 'alert alert-error',
        icon: '⚠️',
      });
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
