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

import Requester from './pages/requester/Requester.jsx';
import Onboarding from './pages/onboarding/Onboarding.jsx';
import Nav from './components/Nav.jsx';
import Discussions from './pages/ticket/Discussions.jsx';

let Layout = () => {
  return (
    <main className=" bg-base-300">
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
          <Route path="/onboarding" element={<Onboarding />} />

          <Route
            element={
              <RequireAuth
                roleType={['Requester', 'SysAdmin', 'Helpdesk Agent']}
              />
            }
          >
            <Route path="/" element={<Requester />} />
            <Route path="/ticket" element={<Discussions />} />
          </Route>

          <Route element={<RequireAuth roleType={['TopG']} />}></Route>

          <Route path="/*" element={<> 404 missing</>} />
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
