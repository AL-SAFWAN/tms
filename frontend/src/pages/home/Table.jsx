import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePermission } from '../../hooks/usePermission';
import { useDeleteTicketMutation } from '../../redux/api/ticket';

function Table({ data }) {
  const navigate = useNavigate();
  const isAdmin = usePermission(['SysAdmin']);

  const [deleteTicket] = useDeleteTicketMutation();

  return (
    <>
      <table className="table bg-base-100 table-pin-rows rounded-2xl ">
        <thead>
          <tr className="bg-base-200 ">
            <th>ID</th>
            <th>Requester</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Resolution Date</th>
            <th>Assigned Agent</th>
            {isAdmin && <th></th>}
          </tr>
        </thead>
        <tbody className="">
          {data?.items?.map(
            ({
              id,
              title,
              status,
              priority,
              creation_date,
              requester,
              resolution_date,
              description,
              assigned_agent,
            }) => (
              <tr
                key={id}
                className={
                  'hover hover:cursor-pointer ' +
                  (status === 'Resolved' && 'opacity-30  hover:opacity-70')
                }
              >
                <th
                  onClick={() => {
                    navigate(`/ticket/${id}`);
                  }}
                >
                  {id}
                </th>
                <td
                  onClick={() => {
                    navigate(`/ticket/${id}`);
                  }}
                >
                  <div className="avatar placeholder items-center space-x-2">
                    <div className="bg-neutral text-neutral-content rounded-full w-7">
                      <span className="capitalize text-xs">
                        {requester.username[0]}
                      </span>
                    </div>

                    <span
                      className="relative z-20 tooltip cursor-pointer tooltip-right"
                      data-tip={requester.email}
                    >
                      <span className="font-semibold ">
                        {requester.username}
                      </span>
                    </span>
                  </div>
                </td>
                <td
                  onClick={() => {
                    navigate(`/ticket/${id}`);
                  }}
                >
                  {title}
                </td>
                <td
                  onClick={() => {
                    navigate(`/ticket/${id}`);
                  }}
                  className="bg-red-510 text-clip text-wrap ..."
                >
                  {description.length > 20
                    ? description.substring(0, 20) + '...'
                    : description}
                </td>
                <td>{creation_date}</td>
                <td
                  onClick={() => {
                    navigate(`/ticket/${id}`);
                  }}
                  className={` font-bold  ${status === 'Open' && ' text-error '}
                      ${status === 'In Progress' && 'text-warning'}
                    ${status === 'Resolved' && 'text-success'}`}
                >
                  {status}
                </td>
                <td
                  onClick={() => {
                    navigate(`/ticket/${id}`);
                  }}
                  className={` font-bold ${priority === 'High' && 'text-error'}
                      ${priority === 'Medium' && 'text-warning'}
                    ${priority === 'Low' && 'text-info'}`}
                >
                  {priority}
                </td>
                <td
                  onClick={() => {
                    navigate(`/ticket/${id}`);
                  }}
                >
                  {resolution_date}
                </td>
                <td
                  onClick={() => {
                    navigate(`/ticket/${id}`);
                  }}
                >
                  {assigned_agent && (
                    <div className="avatar placeholder items-center space-x-2">
                      <div className="bg-neutral text-neutral-content rounded-full w-7">
                        <span className="capitalize text-xs">
                          {assigned_agent?.username[0]}
                        </span>
                      </div>

                      <span
                        className="relative z-10 tooltip cursor-pointer tooltip-left"
                        data-tip={assigned_agent?.email}
                      >
                        <span className="font-semibold ">
                          {assigned_agent?.username}
                        </span>
                      </span>
                    </div>
                  )}
                </td>
                {isAdmin && (
                  <td
                    onClick={() => {
                      deleteTicket(id);
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
                        <path d="M10 11V17"></path> <path d="M14 11V17"></path>
                        <path d="M4 7H20"></path>
                        <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"></path>{' '}
                        <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"></path>{' '}
                      </g>
                    </svg>
                  </td>
                )}
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
}

export default Table;
