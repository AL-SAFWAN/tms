import { useGetTicketQuery } from '../redux/api/ticket.js';
import Nav from '../components/Nav.jsx';
import Table from '../components/Table.jsx';

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
              <button className="btn btn-sm btn-primary w-30 h-10 ">
                Create Ticket
              </button>
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
