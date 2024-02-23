import React from 'react';
import { useSelector } from 'react-redux';

export function usePermission(role) {
  const user = useSelector((state) => state.user);
  return role.find((role) => role == user.role);
}
