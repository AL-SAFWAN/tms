import react, { useState, useEffect } from 'react';
import {
  useGetAgentsTicketsQuery,
  useGetTicketsQuery,
} from '../../redux/api/ticket.js';

import { usePermission } from '../../hooks/usePermission.js';
import { AllTickets } from './TicketTableControls.jsx';

function Requester() {
  // let isRequester = usePermission(['Requester']);
  // let isRequester = usePermission(['Requester']);

  const [{ status, priority, page, size }, setFilterParams] = useState({
    status: '',
    priority: '',
    page: 1,
    size: 7,
  });

  const { data, isLoading } = useGetTicketsQuery({
    status,
    priority,
    page,
    size,
  });

  console.log(data);
  if (isLoading) <>...Loading</>;

  return (
    <div className="max-h-fit min-h-screen p-6 space-y-6 ">
      <div className="  mx-auto ">
        <AllTickets
          data={data}
          status={status}
          priority={priority}
          setFilterParams={setFilterParams}
        />
      </div>
    </div>
  );
}

export default Requester;