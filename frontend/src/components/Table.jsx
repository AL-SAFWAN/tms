import React from 'react';

function Table({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="table table-lg  bg-base-100">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Requester</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Status</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(
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
              <tr key={id}>
                <th>{id}</th>
                <td>{requester.username}</td>
                <td>{title}</td>
                <td>{description}</td>
                <td>{creation_date}</td>
                <td>{status}</td>
                <td>{priority}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
