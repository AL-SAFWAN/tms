import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserQuery } from '../../redux/api/admin';
import { CreateUser, UpdateUser } from '../onboarding/SignUp';

function User() {
  const [descriptionDisabled, setDescriptionDisable] = useState(true);
  const [description, setDescription] = useState(true);
  let { userId } = useParams();
  let { data, isLoading } = useGetUserQuery(userId);
  if (isLoading) return;
  console.log(userId, 'from param ', data);
  return (
    <div className="max-h-fit min-h-screen p-6 space-y-6  ">
      <div className="flex flex-col w-2/3 mx-auto">
        {/* Header  */}
        <div className="mb-3">
          <h1 className="text-2xl font-bold divider divider-start">
            Edit User
          </h1>
        </div>
        <div className=" flex flex-row space-x-5">
          <div className="w-full flex flex-col space-y-5 ">
            {/* User display/form */} <UpdateUser user={data} />
          </div>
          {/* Save and Cancel Button  */}
        </div>
      </div>
    </div>
  );
}
export default User;
