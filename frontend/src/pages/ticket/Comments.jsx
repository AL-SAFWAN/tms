import React, { useState } from 'react';
import { ticketApi, useGetTicketQuery } from '../../redux/api/ticket';
import { useDispatch, useSelector } from 'react-redux';
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from '../../redux/api/comment';
import { usePermission } from '../../hooks/usePermission';
import Confirm from '../../components/Confirm';

let ReadOnlyComment = ({ user, description, creation_date }) => (
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
            <span className="font-semibold ">{user.username}</span>{' '}
            <span className="font-thin text-sm text-base-content/80  italic">
              on{' '}
              {new Date(creation_date).toLocaleString('en-us', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </span>
          </span>
        </div>
      </div>

      <p className="px-2 py-1">{description}</p>
    </div>
  </div>
);

let EditComment = ({ user, description, creation_date, id, ticketId }) => {
  console.log(id);
  let [desc, setDescription] = useState(description);
  let [disabled, setDisabled] = useState(true);
  let dispatch = useDispatch();
  let [deleteComment] = useDeleteCommentMutation();
  let [updateComment] = useUpdateCommentMutation();
  return (
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
              <span className="font-semibold ">{user.username}</span>{' '}
              <span className="font-thin text-sm text-base-content/80 italic">
                on{' '}
                {new Date(creation_date).toLocaleString('en-us', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </span>
            </span>
          </div>
          <div className="flex space-x-1">
            <div>
              <button
                className="btn btn-ghost btn-circle btn-sm"
                onClick={() => setDisabled(!disabled)}
              >
                <svg
                  className="h-4 w-4 stroke-current text-base-content"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 306.637 306.637"
                  strokeWidth="12"
                >
                  <g>
                    <path d="M12.809,238.52L0,306.637l68.118-12.809l184.277-184.277l-55.309-55.309L12.809,238.52z M60.79,279.943l-41.992,7.896 l7.896-41.992L197.086,75.455l34.096,34.096L60.79,279.943z"></path>{' '}
                    <path d="M251.329,0l-41.507,41.507l55.308,55.308l41.507-41.507L251.329,0z M231.035,41.507l20.294-20.294l34.095,34.095 L265.13,75.602L231.035,41.507z"></path>{' '}
                  </g>
                </svg>
              </button>
            </div>
            <div>
              <label
                htmlFor={'delete' + id + 'comment'}
                className="btn btn-ghost btn-circle btn-sm"
              >
                <svg
                  className="cursor-pointer h-5 w-5  stroke-current text-base-content "
                  fill="none"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinecap="rounded"
                  strokeWidth="2"
                >
                  {' '}
                  <g id="SVGRepo_iconCarrier">
                    {' '}
                    <path d="M10 11V17"></path> <path d="M14 11V17"></path>
                    <path d="M4 7H20"></path>
                    <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"></path>{' '}
                    <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"></path>{' '}
                  </g>
                </svg>
              </label>
              <Confirm
                id={id + 'comment'}
                fn={() => {
                  console.log(id);
                  deleteComment(id).finally(() => {
                    dispatch(ticketApi.util.invalidateTags(['Tickets']));
                  });
                }}
                msg="delete comment"
              />
            </div>
          </div>
        </div>
        <textarea
          className="textarea textarea-bordered my-3 h-fit"
          placeholder="Add your comments here..."
          value={desc}
          disabled={disabled}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {desc != description && (
          <div className="self-end space-x-3">
            <button
              className="btn btn-secondary btn-outline text-base-100 btn-sm"
              onClick={() => {
                setDescription(description);
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary text-base-100 btn-sm"
              onClick={() => {
                updateComment({
                  id: id,
                  body: {
                    ticket_id: ticketId,
                    description: desc,
                  },
                }).finally(() => {
                  dispatch(ticketApi.util.invalidateTags(['Tickets']));
                  setDisabled(true);
                });
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>{' '}
    </div>
  );
};
function Comments({ id }) {
  const userId = useSelector((state) => state.user.id);
  const isAdmin = usePermission(['SysAdmin']);
  const { data, isLoading } = useGetTicketQuery(id);
  if (isLoading) return;
  return (
    <>
      {data?.comments.length > 0 && (
        <>
          <div className="divider divider-start font-bold">
            {data?.comments?.length} comments
          </div>
          {data?.comments.map(({ description, creation_date, user, id }) =>
            isAdmin ? (
              <EditComment
                key={id}
                ticketId={data?.id}
                id={id}
                description={description}
                creation_date={creation_date}
                user={user}
              />
            ) : userId === user.id ? (
              <EditComment
                ticketId={data?.id}
                key={id}
                id={id}
                description={description}
                creation_date={creation_date}
                user={user}
              />
            ) : (
              <ReadOnlyComment
                id={id}
                description={description}
                creation_date={creation_date}
                user={user}
              />
            )
          )}
        </>
      )}
    </>
  );
}

export default Comments;
