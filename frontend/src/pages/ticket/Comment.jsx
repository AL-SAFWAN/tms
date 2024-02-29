import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateCommentMutation } from '../../redux/api/comment';
import { ticketApi } from '../../redux/api/ticket';

function Comment({ id }) {
  const user = useSelector((state) => state.user);
  // refactor so I don't need to pass in the user id, should be done via the token
  let dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [createComment] = useCreateCommentMutation();
  let onSubmit = () => {
    createComment({
      description: description,
      commented_by_id: user.id,
      ticket_id: id,
    }).finally(() => {
      setDescription('');
      dispatch(ticketApi.util.invalidateTags(['Tickets']));
    });
  };
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
                <span className="font-semibold">{user.username}</span>
              </span>
            </div>
          </div>
          <textarea
            className="textarea textarea-bordered my-3 h-36"
            placeholder="Add your comments here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div className="card-actions justify-end">
            {description && (
              <>
                <button
                  className="btn btn-secondary btn-outline text-base-100 btn-sm"
                  onClick={() => {
                    setDescription('');
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary text-base-100 btn-sm"
                  onClick={onSubmit}
                >
                  Comment
                </button>
              </>
            )}
          </div>
        </div>
      </div>{' '}
    </>
  );
}

export default Comment;
