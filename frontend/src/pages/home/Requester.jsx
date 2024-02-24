import react, { useState, useEffect } from 'react';
import { useGetTicketsQuery } from '../../redux/api/ticket.js';
import Table from '../../components/Table.jsx';
import { Form } from './Form.jsx';

function Requester() {
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
  console.log(data, 'ticket data');
  if (isLoading) <>...Loading</>;

  return (
    <div className="max-h-fit min-h-screen p-6 space-y-6 ">
      <div className="  mx-auto ">
        <div className="mb-6">
          <h1 className="text-2xl font-bold divider divider-start">
            My Tickets
          </h1>
        </div>
        <div className="flex flex-row space-x-5 justify-between ">
          <div className="flex flex-col space-y-5  w-40 ">
            <button
              className="btn btn-primary text-base-100"
              onClick={() => document.getElementById('my_modal_2').showModal()}
            >
              Create Ticket
            </button>
            <dialog id="my_modal_2" className="modal">
              <div className="modal-box">
                <Form />
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
            <div className="space-y-1">
              <label className="">Priority</label>
              <select
                className="select  w-full  select-bordered "
                value={priority}
                onChange={(e) => {
                  setFilterParams((prevParams) => ({
                    ...prevParams,
                    priority: e.target.value === 'All' ? null : e.target.value,
                  }));
                }}
              >
                <option>All</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="">Status</label>
              <select
                className="select  w-full  select-bordered"
                value={status}
                onChange={(e) => {
                  setFilterParams((prevParams) => ({
                    ...prevParams,
                    status: e.target.value === 'All' ? null : e.target.value,
                  }));
                }}
              >
                <option>All</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col justify-between w-full min:w-2/3">
            <div className="min-h-[400px]  overflow-x-auto rounded-2xl bg-base-100">
              <div className="  bg-base-100 rounded-2xl">
                <Table data={data} setFilterParams={setFilterParams} />
              </div>
            </div>

            <div className="join mx-auto p-2 ">
              <button
                className="join-item btn"
                onClick={() => {
                  setFilterParams((prevState) => ({
                    ...prevState,
                    page: prevState.page - 1,
                  }));
                }}
                disabled={data?.page === 1}
              >
                «
              </button>
              <button className="join-item btn">{data?.page}</button>

              <button
                className="join-item btn"
                onClick={() => {
                  setFilterParams((prevState) => ({
                    ...prevState,
                    page: prevState.page + 1,
                  }));
                }}
                disabled={data?.page === data?.pages || data?.pages === 0}
              >
                »
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Requester;
