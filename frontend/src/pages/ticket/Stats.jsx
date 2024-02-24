import React, { useState, useEffect } from 'react';
import {
  useGetTicketQuery,
  useUpdateTicketMutation,
} from '../../redux/api/ticket';
import { usePermission } from '../../hooks/usePermission';
import { useSelector } from 'react-redux';
function Stats({ id, description, setDescription, setDescriptionDisable }) {
  const user = useSelector((state) => state.user);
  const { data, isFetching } = useGetTicketQuery(id);
  const [updateTicket] = useUpdateTicketMutation();

  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [assignMe, setAssignMe] = useState('');

  const [hasChanged, setHasChanged] = useState(false);
  const isAdminOrAgent = usePermission(['SysAdmin', 'Helpdesk Agent']);

  const save = () => {
    setDescriptionDisable(true);
    console.log(
      JSON.stringify({
        title: data.title,
        description,
        priority,
        status,
        resolution_date: dateTime,
        assigned_agent_id: assignMe ? user.id : data.assigned_agent_id,
      })
    );
    updateTicket({
      id: data.id,
      body: {
        title: data.title,
        description,
        priority,
        status,
        resolution_date: dateTime,
        assigned_agent_id: assignMe,
      },
    });
  };

  useEffect(() => {
    if (data) {
      setPriority(data.priority);
      setStatus(data.status);
      setDateTime(data.resolution_date);
      setAssignMe(data.assigned_agent_id);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      // const date = data?.resolution_date ? data.resolution_date : '';
      const changed =
        priority !== data.priority ||
        status !== data.status ||
        description !== data.description ||
        dateTime !== data?.resolution_date ||
        assignMe !== data?.assigned_agent_id;
      console.log(changed);
      setHasChanged(changed);
    }
  }, [priority, status, data, description, dateTime, assignMe]);

  if (isFetching || !data) {
    return <div>Loading...</div>;
  }

  console.log(dateTime);
  console.log(data, user);
  return (
    <div className="flex flex-col space-y-3">
      {isAdminOrAgent &&
        (user.id == data?.assigned_agent_id ? (
          <button
            className="btn btn-primary btn-outline"
            onClick={() => setAssignMe(null)}
          >
            Remove Assign Me
          </button>
        ) : (
          <button
            className="btn btn-primary btn-outline"
            onClick={() => setAssignMe(user.id)}
          >
            Assign Me
          </button>
        ))}
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
                disabled={!isAdminOrAgent}
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
            {assignMe === user.id
              ? user?.username
              : assignMe === data?.assigned_agent_id &&
                data.assigned_agent?.username}
          </div>
        </div>

        <div className="stat">
          <div className="stat-title text-xs">Created On</div>
          <div className="stat-value text-sm p-1">
            {data?.creation_date.split('T').join(' | ')}
          </div>
        </div>

        <div className="stat">
          <div className="stat-title text-xs">Resolved On</div>
          <div className="stat-value text-sm p-1 ">
            {isAdminOrAgent && status == 'Resolved' ? (
              <input
                type="datetime-local"
                id="datetime-local"
                name="datetime"
                value={dateTime ? dateTime : ''}
                onChange={(e) => setDateTime(e.target.value)}
                className="form-input input input-bordered input-xs"
              />
            ) : data?.resolution_date ? (
              data?.resolution_date.split('T').join(' | ')
            ) : (
              ''
            )}
          </div>
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
              setDateTime(data?.resolution_date);
              setAssignMe(data?.assigned_agent_id);
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
