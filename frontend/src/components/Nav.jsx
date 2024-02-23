import React, { useEffect, useState } from 'react';
import { logout } from '../redux/slice/user';
import { ticketApi } from '../redux/api/ticket';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Nav = () => {
  let dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  let handelLogout = () => {
    dispatch(logout());
    dispatch(ticketApi.util.resetApiState());
  };
  const [isdark, setIsdark] = useState(
    JSON.parse(localStorage.getItem('isdark'))
  );
  useEffect(() => {
    localStorage.setItem('isdark', JSON.stringify(isdark));
  }, [isdark]);
  return (
    <div className="navbar bg-base-100 ">
      <div className="navbar-start">
        {/* <div className="dropdown">
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
        </div> */}
      </div>
      <div className="navbar-center">
        <Link className="btn btn-ghost text-xl" to="/">
          TMS
        </Link>
      </div>
      <div className="navbar-end z-20 pr-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-sm btn-circle avatar  "
          >
            {/* <div className="w-10 rounded-full"> */}
            <div className="bg-neutral border border-slate-500 text-neutral-content rounded-full w-full h-full !flex !items-center !justify-center ">
              <span className="capitalize text-sm"> {user.username[0]}</span>
            </div>

            {/* <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              /> */}
            {/* </div> */}
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-2"
          >
            <li>
              <a className="flex flex-col p-2">
                <div className="absolute right-2">
                  <label className="cursor-pointer grid place-items-center">
                    <input
                      type="checkbox"
                      value="nord"
                      checked={isdark}
                      onChange={() => setIsdark(!isdark)}
                      className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
                    />
                    <svg
                      className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {' '}
                      <circle cx="12" cy="12" r="5" />
                      <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                    </svg>{' '}
                    <svg
                      className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                  </label>
                </div>
                <div className=" p-0 w-full">
                  <div className="text-xs  text-base-content/80 italic">
                    username
                  </div>
                  <div className=" pl-2 ">{user.username}</div>
                </div>
                <div className=" p-0 w-full">
                  <div className="text-xs text-base-content/80 italic">
                    email
                  </div>
                  <div className=" pl-2 ">{user.email}</div>
                </div>
                <div className=" p-0 w-full">
                  <div className="text-xs text-base-content/80 italic">
                    role
                  </div>
                  <div className=" pl-2 ">{user.role}</div>
                </div>
              </a>
            </li>
            <div className="divider p-0 m-0 h-[1px]"></div>
            <li onClick={handelLogout}>
              <a className="p-2 ">
                <svg
                  // fill="bg-base-content"
                  className="h-5 w-5  stroke-current text-base-content"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 471.2 471.2"
                  // stroke="bg-base-content"
                  strokeWidth="30"
                >
                  <g>
                    <path d="M227.619,444.2h-122.9c-33.4,0-60.5-27.2-60.5-60.5V87.5c0-33.4,27.2-60.5,60.5-60.5h124.9c7.5,0,13.5-6,13.5-13.5 s-6-13.5-13.5-13.5h-124.9c-48.3,0-87.5,39.3-87.5,87.5v296.2c0,48.3,39.3,87.5,87.5,87.5h122.9c7.5,0,13.5-6,13.5-13.5 S235.019,444.2,227.619,444.2z"></path>{' '}
                    <path d="M450.019,226.1l-85.8-85.8c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1l62.8,62.8h-273.9c-7.5,0-13.5,6-13.5,13.5 s6,13.5,13.5,13.5h273.9l-62.8,62.8c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l85.8-85.8 C455.319,239.9,455.319,231.3,450.019,226.1z"></path>{' '}
                  </g>
                </svg>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
