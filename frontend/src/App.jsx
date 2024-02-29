import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
  useLocation,
} from 'react-router-dom';

import { useSelector } from 'react-redux';
// import { setCredential } from '../redux/slice/user';

import Home from './pages/home';
import Login from './pages/onboarding';
import Nav from './components/Nav.jsx';
import Ticket from './pages/ticket';
import AssignedTickets from './pages/my_tickets/index.jsx';
import Users from './pages/users/index.jsx';
import User from './pages/users/user.jsx';

let Layout = () => {
  return (
    <main className=" bg-base-300 min-w-fit">
      <Outlet />
    </main>
  );
};

let RequireAuth = ({ roleType }) => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  console.log('user', user);
  return (
    <>
      {roleType.find((role) => role == user.role) ? (
        <>
          <Nav />
          <Outlet />
        </>
      ) : user?.token ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
      ) : (
        <Navigate to="/onboarding" state={{ from: location }} replace />
      )}
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/onboarding" element={<Login />} />

          <Route
            element={
              <RequireAuth
                roleType={['Requester', 'SysAdmin', 'Helpdesk Agent']}
              />
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/my_tickets" element={<AssignedTickets />} />
            <Route path="/ticket/:ticketId" element={<Ticket />} />
          </Route>

          <Route element={<RequireAuth roleType={['SysAdmin']} />}>
            <Route path="/users" element={<Users />} />
            <Route path="/users/:userId" element={<User />} />
            <Route path="/logs" element={<> Logs</>} />
          </Route>

          <Route path="/unauthorized" element={<> Get out of here</>} />
          <Route path="/*" element={<> 404 missing</>} />
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
