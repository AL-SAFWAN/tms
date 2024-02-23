import { useState } from 'react';
import { Login } from './Login';
import { SignUp } from './SignUp';

function Onboarding() {
  const [stage, setStage] = useState(false);
  return (
    <div className="max-h-fit min-h-screen bg-base-300 flex flex-col items-center justify-center">
      <h2 className="card-title pb-4">Login to your account!</h2>
      <div className="card card-side bg-base-100 shadow-xl  w-3/4 h-[660px] ">
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
      </div>
    </div>
  );
}

export default Onboarding;
