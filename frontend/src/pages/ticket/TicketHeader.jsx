import React from 'react';
import { useGetTicketQuery } from '../../redux/api/ticket';

function Header({ id }) {
  const { data } = useGetTicketQuery(id);
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold divider divider-start ">
        {data?.title}
        <span className="font-thin text-base-content/80"> #{data?.id}</span>
      </h1>
      <p className="text-base-content/80 font-thin">
        <span className="font-semibold italic">
          {data?.requester?.username}
        </span>{' '}
        started this conversation
      </p>
    </div>
  );
}

export default Header;
