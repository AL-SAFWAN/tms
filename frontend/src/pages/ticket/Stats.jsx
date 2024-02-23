import React, { useState, useEffect } from 'react';
import {
  useGetTicketQuery,
  useUpdateTicketMutation,
} from '../../redux/api/ticket';
import { usePermission } from '../../hooks/usePermission';
function Stats({ id, description, setDescription, setDescriptionDisable }) {
  const { data, isFetching } = useGetTicketQuery(id);
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [hasChanged, setHasChanged] = useState(false);
  const adminOrAgent = usePermission(['SysAdmin', 'Helpdesk Agent']);
  const [updateTicket] = useUpdateTicketMutation();
  const save = () => {
    setDescriptionDisable(true);
    updateTicket({
      id: data.id,
      body: {
        title: data.title,
        description,
        priority,
        status,
      },
    });
  };

  useEffect(() => {
    if (data) {
      setPriority(data.priority);
      setStatus(data.status);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const changed =
        priority !== data.priority ||
        status !== data.status ||
        description !== data.description;
      setHasChanged(changed);
      console.log('has changed');
    }
  }, [priority, status, data, description]);

  if (isFetching || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col space-y-3">
      <div className="stats stats-vertical shadow ">
        <div className="stat">
          <div className="stat-title text-xs">Priority</div>
          <div className="stat-value text-sm">
            <select
              className="select  w-full select-xs mt-2 -mb-1 select-bordered"
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value);
              }}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <div className="stat">
          <div className="stat-title text-xs">Status</div>
          <div className="stat-value text-sm">
            <div className="stat-value text-sm">
              <select
                className="select  w-full select-xs mt-2 -mb-1 select-bordered"
                value={status}
                disabled={!adminOrAgent}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </div>
          </div>
        </div>

        <div className="stat">
          <div className="stat-title text-xs">Assigned Agent</div>
          <div className="stat-value text-sm p-1 ">
            {data?.assigned_agent_id}
          </div>
        </div>

        <div className="stat">
          <div className="stat-title text-xs">Created On</div>
          <div className="stat-value text-sm p-1">{data?.creation_date}</div>
        </div>

        <div className="stat">
          <div className="stat-title text-xs">Resolved On</div>
          <div className="stat-value text-sm p-1 ">{data?.resolution_date}</div>
        </div>
      </div>
      {hasChanged && (
        <>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setPriority(data?.priority);
              setStatus(data?.status);
              setDescription(data?.description);
              setDescriptionDisable(true);
            }}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary text-base-100"
            onClick={() => {
              save();
            }}
          >
            Save
          </button>
        </>
      )}
    </div>
  );
}

export default Stats;
