import react, { useState, useEffect } from 'react';
import { CreateUser } from '../onboarding/SignUp';
import {
  adminApi,
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../../redux/api/admin';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ticketApi } from '../../redux/api/ticket';

function Requester() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  console.log(data);
  if (isLoading) <>...Loading</>;

  return (
    <div className="max-h-fit min-h-screen p-6 space-y-6 ">
      <div className="  mx-auto ">
        <div className="mb-6">
          <h1 className="text-2xl font-bold divider divider-start">
            All Users
          </h1>
        </div>
        <div className="flex flex-row space-x-5 justify-between ">
          <div className="flex flex-col space-y-5  w-40 ">
            <button
              className="btn btn-primary text-base-100"
              onClick={() => document.getElementById('my_modal').showModal()}
            >
              Create User
            </button>
            <dialog id="my_modal" className="modal">
              <div className="modal-box">
                <CreateUser />
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>
          <div className="flex flex-col justify-between w-full min:w-2/3">
            <div className="  overflow-x-auto rounded-2xl bg-base-100">
              <div className="  bg-base-100 rounded-2xl">
                <>
                  {/* // <div className=" overflow-x-auto overflow-y-auto  w-full h-full"> */}
                  <table className="table  bg-base-100 table-pin-rows rounded-2xl ">
                    {/* head */}
                    <thead>
                      <tr className="bg-base-200 ">
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        {/* <th>Assigned Agent</th> */}
                        <th className="w-1"></th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {data?.map(({ id, username, email, role }) => (
                        <tr key={id} className="hover hover:cursor-pointer">
                          <th
                            onClick={() => {
                              navigate(`/users/${id}`);
                            }}
                          >
                            {id}
                          </th>
                          <td
                            onClick={() => {
                              navigate(`/users/${id}`);
                            }}
                          >
                            {username}
                          </td>
                          <td
                            onClick={() => {
                              navigate(`/users/${id}`);
                            }}
                          >
                            {email}
                          </td>
                          <td
                            onClick={() => {
                              navigate(`/users/${id}`);
                            }}
                          >
                            {role}
                          </td>
                          <td
                            onClick={() => {
                              deleteUser(id).finally(() => {
                                dispatch(
                                  ticketApi.util.invalidateTags(['Tickets'])
                                );
                              });
                            }}
                          >
                            <svg
                              className="h-5 w-5  stroke-current text-base-content hover:scale-125"
                              fill="none"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              strokeLinecap="rounded"
                              strokeWidth="2"
                            >
                              {' '}
                              <g id="SVGRepo_iconCarrier">
                                {' '}
                                <path d="M10 11V17"></path>{' '}
                                <path d="M14 11V17"></path>
                                <path d="M4 7H20"></path>
                                <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"></path>{' '}
                                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"></path>{' '}
                              </g>
                            </svg>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Requester;
