import React from 'react';
import { useSelector } from 'react-redux';

function Comment() {
  const user = useSelector((state) => state.user);
  return (
    <>
      <div className="divider divider-start font-bold">Add a comment</div>
      <div className="card w-full bg-base-100 shadow">
        <div className="card-body">
          <div className="flex flex-row items-center justify-between">
            <div className="avatar placeholder items-center space-x-2">
              <div className="bg-neutral text-neutral-content rounded-full w-8">
                <span className="capitalize"> {user.username[0]}</span>
              </div>

              <span
                className="relative z-20 tooltip cursor-pointer tooltip-right"
                data-tip={user.email}
              >
                <span className="font-semibold italic">{user.username}</span>
              </span>
            </div>
          </div>
          <textarea
            className="textarea textarea-bordered my-3 h-36"
            placeholder="Add your comments here..."
          ></textarea>

          <div className="card-actions justify-end">
            <button className="btn btn-primary text-base-100 btn-sm">
              Comment
            </button>
          </div>
        </div>
      </div>{' '}
    </>
  );
}

export default Comment;
