import {
  isRejectedWithValue,
  isFulfilled,
  isAsyncThunkAction,
} from '@reduxjs/toolkit';
import { logout } from '../redux/slice/user';
import toast from 'react-hot-toast';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  const method = action.meta?.baseQueryMeta?.request?.method;

  if (method === 'DELETE') {
    toast.success('Delete Successful!', {
      className: 'alert alert-success',
      icon: '❌',
    });
  }

  if (
    isFulfilled(action) &&
    action?.type != 'authApi/executeMutation/fulfilled'
  ) {
    if (method === 'POST') {
      toast.success('Create Successful!', {
        className: 'alert alert-success',
      });
    }
    if (method === 'PUT') {
      toast('Updated Successful!', {
        className: 'alert alert-info',
      });
    }
  }

  if (isRejectedWithValue(action)) {
    if (
      action.payload.status === 404 &&
      action?.type !== 'authApi/executeMutation/rejected'
    ) {
      toast(action.payload.data.detail, {
        className: 'alert alert-error',
        icon: '⚠️',
      });
    }

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
