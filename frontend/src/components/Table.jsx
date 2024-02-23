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
                className="hover cursor-pointer"
                onClick={() => {
                  console.log(id, 'ticket id ');
                  navigate('/ticket', { state: { id: id } });
                  // should have a navigate here
                }}
              >
                <th>{id}</th>
                <td>{requester.username}</td>
                <td>{title}</td>
                <td className="bg-red-510 text-clip text-wrap ...">
                  {description.length > 20
                    ? description.substring(0, 20) + '...'
                    : description}
                </td>
                <td>{creation_date}</td>
                <td>{status}</td>
                <td>{priority}</td>
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
