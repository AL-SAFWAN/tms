import react, { useState, useEffect } from 'react';
import { useGetTicketsQuery } from '../../redux/api/ticket.js';
import Table from '../../components/Table.jsx';
import { Form } from './Form.jsx';

function Requester() {
  const [{ status, priority }, setFilterParams] = useState({
    status: null,
    priority: null,
  });
  const { data, isLoading } = useGetTicketsQuery({
    status,
    priority,
  });

  if (isLoading) <>...Loading</>;

  return (
    <div className="max-h-fit min-h-screen p-6 space-y-6 ">
      <div className=" w-2/3 mx-auto ">
        <div className="mb-6">
          <h1 className="text-2xl font-bold divider divider-start">
            My Tickets
          </h1>
        </div>
        <div className="flex flex-row space-x-10 justify-between ">
          <div className="w-fit flex space-x-5 ">
            <div className="flex flex-row space-x-5 ">
              <div className="flex flex-col space-y-5 w-40 ">
                <button
                  className="btn btn-primary "
                  onClick={() =>
                    document.getElementById('my_modal_2').showModal()
                  }
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
                <div>
                  <label className="">Priority</label>
                  <select
                    className="select  w-full  select-bordered "
                    value={priority}
                    onChange={(e) => {
                      setFilterParams((prevParams) => ({
                        ...prevParams,
                        priority:
                          e.target.value === 'All' ? null : e.target.value,
                      }));
                      // setPriority(e.target.value);
                    }}
                  >
                    <option>All</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div>
                  <label className="">Status</label>
                  <select
                    className="select  w-full  select-bordered"
                    value={status}
                    onChange={(e) => {
                      setFilterParams((prevParams) => ({
                        ...prevParams,
                        status:
                          e.target.value === 'All' ? null : e.target.value,
                      }));
                      // setPriority(e.target.value);
                    }}
                  >
                    <option>All</option>
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="  max-h-[700px] w-full min-w-[200px] overflow-x-auto p-2">
            <Table data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Requester;
