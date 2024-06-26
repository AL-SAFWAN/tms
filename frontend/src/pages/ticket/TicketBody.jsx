import React, { useState, useEffect } from 'react';
import { useGetTicketQuery } from '../../redux/api/ticket';

function TicketDisplay({
  id,
  description,
  setDescription,
  descriptionDisabled,
  setDescriptionDisable,
}) {
  const { data } = useGetTicketQuery(id);

  useEffect(() => {
    if (data) {
      setDescription(data.description);
    }
  }, [data]);

  return (
    <div className="card w-full bg-base-100 shadow ">
      <div className="card-body w-full">
        <div className="flex flex-row items-center justify-between p-2 pb-3 pt-0">
          <div className="avatar placeholder items-center space-x-2">
            <div className="bg-neutral text-neutral-content rounded-full w-8">
              <span className="capitalize">{data?.requester?.username[0]}</span>
            </div>
            <span
              className="relative z-20 tooltip cursor-pointer tooltip-right"
              data-tip={data?.requester?.email}
            >
              <span className="font-semibold italic">
                {data?.requester?.username}
              </span>
            </span>
          </div>
          <div>
            <button
              className="btn btn-ghost btn-circle btn-sm"
              onClick={() => setDescriptionDisable(!descriptionDisabled)}
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
        </div>
        <textarea
          className="textarea textarea-bordered min-h-36"
          disabled={descriptionDisabled}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
      </div>
    </div>
  );
}

export default TicketDisplay;
