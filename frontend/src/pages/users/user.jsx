import React from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetUserLogsQuery,
  useDeleteUserLogsMutation,
} from '../../redux/api/logs';
import { UpdateUser } from '../onboarding/SignUp';
import Confirm from '../../components/Confirm';
function removeDuplicateDetails(sequence) {
  const result = [];
  for (let i = 0; i < sequence.length; i++) {
    if (sequence[i]?.details !== result[result.length - 1]?.details) {
      result.push(sequence[i]);
    }
  }
  return result;
}

function User() {
  let { userId } = useParams();
  let [deleteUserLogs] = useDeleteUserLogsMutation();
  let { data: logData, isLoading } = useGetUserLogsQuery(userId);
  if (isLoading) return;
  return (
    <div className="max-h-fit min-h-screen p-6 space-y-6  ">
      <div className="flex flex-col w-2/3 mx-auto">
        <div className="mb-3">
          <h1 className="text-2xl font-bold divider divider-start">
            Edit User
          </h1>
        </div>
        <div className="w-full flex flex-col space-y-5 ">
          <UpdateUser userId={userId} />
        </div>
        <div className="mb-0">
          <h1 className="text-2xl font-bold divider divider-start ">Logs</h1>
        </div>
        <div className="flex self-end mb-6">
          <label
            htmlFor={'delete' + userId + 'userLogs'}
            className="btn btn-secondary  "
          >
            Clear User Logs
          </label>
          <Confirm
            id={userId + 'userLogs'}
            fn={() => {
              deleteUserLogs(userId);
            }}
            msg="clear user logs"
          />
        </div>
        <div className="space-y-3 ">
          {removeDuplicateDetails(logData).map((data) => {
            if (data.activity_type == 'Read') {
              return (
                <div
                  key={data.id}
                  role="alert"
                  className="alert alert-info opacity-50 p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-current shrink-0 w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>

                  <span>
                    <span className="italic badge badge-info-content mr-2 uppercase font-medium ">
                      {data.activity_type}
                    </span>
                    {data.details}
                  </span>
                  <span className="font-semibold">
                    {data.activity_date.split('T').join(' ')}
                  </span>
                </div>
              );
            }
            if (data.activity_type == 'Update') {
              return (
                <div
                  key={data.id}
                  role="alert"
                  className="alert alert-warning p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>

                  <span>
                    <span className="italic badge badge-warning-content mr-2 uppercase font-medium ">
                      {data.activity_type}
                    </span>
                    {data.details}
                  </span>
                  <span className="font-semibold">
                    {data.activity_date.split('T').join(' ')}
                  </span>
                </div>
              );
            }
            if (data.activity_type == 'Create') {
              return (
                <div
                  role="alert"
                  key={data.id}
                  className="alert alert-success p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <span>
                    <span className="italic badge badge-success-content mr-2 uppercase font-medium">
                      {data.activity_type}
                    </span>
                    {data.details}
                  </span>
                  <span className="font-semibold">
                    {data.activity_date.split('T').join(' ')}
                  </span>
                </div>
              );
            }
            if (data.activity_type == 'Delete') {
              return (
                <div
                  key={data.id}
                  role="alert"
                  className="alert alert-error p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <span>
                    <span className="italic badge badge-error-content mr-2 uppercase font-medium">
                      {data.activity_type}
                    </span>
                    {data.details}
                  </span>
                  <span className="font-semibold">
                    {data.activity_date.split('T').join(' ')}
                  </span>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
export default User;
