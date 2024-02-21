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

import Requester from './pages/Requester/Requester.jsx';
import Onboarding from './pages/onboarding/Onboarding.jsx';

let Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

let RequireAuth = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  return (
    <>
      {user.token !== null ? (
        <Outlet />
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
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Requester />} />
          </Route>
          <Route path="/onboarding" element={<Onboarding />} />
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
