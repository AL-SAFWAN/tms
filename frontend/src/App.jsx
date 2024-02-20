import { useState } from 'react';
import './App.css';
import { useGetTicketQuery } from './redux/api/ticket';
let Nav = () => (
  <div className="navbar bg-base-100 ">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a>Homepage</a>
          </li>
          <li>
            <a>Portfolio</a>
          </li>
          <li>
            <a>About</a>
          </li>
        </ul>
      </div>
    </div>
    <div className="navbar-center">
      <a className="btn btn-ghost text-xl">TMS</a>
    </div>
    <div className="navbar-end">
      <button className="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
      <button className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="badge badge-xs badge-primary indicator-item"></span>
        </div>
      </button>
    </div>
  </div>
);
function App() {
  const { data, error, isLoading } = useGetTicketQuery();
  console.log(data, error, isLoading);
  let app = [
    {
      title: 'string',
      description: 'string',
      status: 'Open',
      priority: 'Low',
      requester_id: 1,
      id: 2,
      creation_date: '2024-02-20T12:28:26',
      resolution_date: null,
      requester: {
        username: 'test',
        email: 'test@example.com',
        role: 'Requester',
      },
    },
    {
      title: 'string',
      description: 'string',
      status: 'Open',
      priority: 'Low',
      requester_id: 1,
      id: 3,
      creation_date: '2024-02-20T12:28:29',
      resolution_date: null,
      requester: {
        username: 'test',
        email: 'test@example.com',
        role: 'Requester',
      },
    },
    {
      title: 'string',
      description: 'string',
      status: 'Open',
      priority: 'Low',
      requester_id: 1,
      id: 4,
      creation_date: '2024-02-20T12:28:33',
      resolution_date: null,
      requester: {
        username: 'test',
        email: 'test@example.com',
        role: 'Requester',
      },
    },
  ];

  return (
    <div className="h-screen bg-base-300 space-y-5">
      <Nav />
      <div className="flex flex-col w-fit mx-auto ">
        <div class="mb-6">
          <h1 class="text-2xl font-bold divider divider-start">My Tickets</h1>
        </div>
        <div className="w-fit mx-auto flex space-x-5">
          {/* LEFT SIDE */}
          <div className="flex flex-col space-y-5 w-100">
            {/* <button className="btn btn-primary btn-sm mr-5 mt-0 min-w-20">
            Create Ticket
          </button> */}
            <button className="btn btn-sm btn-primary w-30 ">
              Create Ticket
            </button>

            <div className="join">
              <input
                className="input input-bordered join-item w-28 h-9"
                placeholder="Search"
              />
              <div className="btn btn-sm btn-secondary join-item  h-9 w-10 ">
                <svg
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  height="2em"
                  width="2em"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
                </svg>
              </div>
            </div>
            <div>
              <p className="font-bold">Filter by</p>
              <div className="form-control flex flex-col space-y-1.5">
                <label className="label cursor-pointer justify-start">
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio"
                    value="All"
                  />
                  <span className="label-text pl-2">All</span>
                </label>
                <label className="label cursor-pointer justify-start">
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio"
                    value="Open"
                  />
                  <span className="label-text pl-2">Open</span>
                </label>
                <label className="label cursor-pointer justify-start">
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio"
                    value="In Progress"
                  />

                  <span className="label-text pl-2">In progress</span>
                </label>
                <label className="label cursor-pointer justify-start">
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio"
                    value="Resolved"
                  />
                  <span className="label-text pl-2">Resolved</span>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="overflow-x-auto">
            <table className="table bg-base-100">
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
        </div>
      </div>
    </div>
  );
}

export default App;
