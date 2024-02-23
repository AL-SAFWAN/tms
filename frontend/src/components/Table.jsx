import React from 'react';
import { useNavigate } from 'react-router-dom';

function Table({ data, setFilterParams }) {
  const navigate = useNavigate();
  return (
    <>
      {/* // <div className=" overflow-x-auto overflow-y-auto  w-full h-full"> */}
      <table className="table   bg-base-100 table-pin-rows rounded-2xl ">
        {/* head */}
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
            }) => (
              <tr
                key={id}
                className={
                  'hover cursor-pointer ' +
                  (status === 'Resolved' && 'opacity-30  hover:opacity-70')
                }
                onClick={() => {
                  console.log(id, 'ticket id ');
                  navigate('/ticket', { state: { id: id } });
                  // should have a navigate here
                }}
              >
                <th>{id}</th>
                <td>
                  {/* {requester.username} */}
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
                <td>{title}</td>
                <td className="bg-red-510 text-clip text-wrap ...">
                  {description.length > 20
                    ? description.substring(0, 20) + '...'
                    : description}
                </td>
                <td>{creation_date}</td>
                <td
                  className={` font-bold ${status === 'Open' && 'text-error'}
                      ${status === 'In Progress' && 'text-warning'}
                    ${status === 'Resolved' && 'text-info'}`}
                >
                  {status}
                </td>
                <td
                  className={` font-bold ${priority === 'High' && 'text-error'}
                      ${priority === 'Medium' && 'text-warning'}
                    ${priority === 'Low' && 'text-info'}`}
                >
                  {priority}
                </td>
                <td>{resolution_date}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
}

export default Table;
