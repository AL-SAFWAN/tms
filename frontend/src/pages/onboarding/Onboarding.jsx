import { useEffect, useState } from 'react';
import { Login } from './Login';
import { SignUp } from './SignUp';

function Onboarding() {
  const [stage, setStage] = useState(false);
  const [isdark, setIsdark] = useState(
    JSON.parse(localStorage.getItem('isdark'))
  );
  useEffect(() => {
    localStorage.setItem('isdark', JSON.stringify(isdark));
  }, [isdark]);
  return (
    <div className="max-h-fit min-h-screen bg-base-300 flex flex-col items-center justify-center p-28">
      <h2 className="card-title pb-4">Login to your account!</h2>
      <div className="relative card card-side bg-base-100 shadow-xl  max-w-[900px]  min-h-[660px]  ">
        <figure className="w-1/2">
          <img
            className="w-full h-full object-cover"
            src="https://assets-global.website-files.com/62ac8c02e9a53246274553e0/63e90d0f8b497e50d94c2be3_Ticket%20Management%20System%20(1).jpg"
          />
        </figure>
        <div className="card-body flex flex-cols justify-start">
          {stage ? (
            <SignUp setStage={setStage} />
          ) : (
            <Login setStage={setStage} />
          )}
        </div>
        <div className=" absolute top-2 right-2">
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
      </div>
    </div>
  );
}

export default Onboarding;
