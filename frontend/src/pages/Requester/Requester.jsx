import { useGetTicketQuery } from '../../redux/api/ticket.js';
import Nav from '../../components/Nav.jsx';
import Table from '../../components/Table.jsx';
import { Form } from './Form.jsx';

function Requester() {
  const { data, error, isLoading } = useGetTicketQuery();
  console.log(data, error, isLoading);

  return (
    <div className="h-screen bg-base-300 space-y-5">
      <Nav />
      <div className="flex flex-col w-fit mx-auto ">
        <div className="mb-6">
          <h1 className="text-2xl font-bold divider divider-start">
            My Tickets
          </h1>
        </div>
        <div className="w-fit mx-auto flex space-x-5">
          {/* LEFT SIDE */}
          <div className="flex flex-row space-x-5 ">
            <div className="flex flex-col space-y-5">
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
            </div>
            <div className="flex flex-row space-x-4">
              <Table data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Requester;
