import React from 'react';
import { logout } from '../redux/slice/user';
import { ticketApi } from '../redux/api/ticket';
import { useDispatch } from 'react-redux';

const Nav = () => {
  let dispatch = useDispatch();
  let handelLogout = () => {
    dispatch(logout());
    dispatch(ticketApi.util.resetApiState());
  };
  return (
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
            <li onClick={() => {}}>
              <a>logout</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">TMS</a>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle" onClick={handelLogout}>
          <svg
            fill="#f4f4f4"
            className="h-5 w-5"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 471.2 471.2"
            stroke="#f4f4f4"
            strokeWidth="18"
          >
            <g>
              <path d="M227.619,444.2h-122.9c-33.4,0-60.5-27.2-60.5-60.5V87.5c0-33.4,27.2-60.5,60.5-60.5h124.9c7.5,0,13.5-6,13.5-13.5 s-6-13.5-13.5-13.5h-124.9c-48.3,0-87.5,39.3-87.5,87.5v296.2c0,48.3,39.3,87.5,87.5,87.5h122.9c7.5,0,13.5-6,13.5-13.5 S235.019,444.2,227.619,444.2z"></path>{' '}
              <path d="M450.019,226.1l-85.8-85.8c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1l62.8,62.8h-273.9c-7.5,0-13.5,6-13.5,13.5 s6,13.5,13.5,13.5h273.9l-62.8,62.8c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l85.8-85.8 C455.319,239.9,455.319,231.3,450.019,226.1z"></path>{' '}
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Nav;
