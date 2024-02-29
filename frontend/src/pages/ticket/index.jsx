import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import TicketDisplay from './TicketDisplay';
import Header from './Header';
import Comments from './Comments';
import Comment from './Comment';
import Stats from './Stats';

function Discussions() {
  const [descriptionDisabled, setDescriptionDisable] = useState(true);
  const [description, setDescription] = useState(true);
  let { ticketId } = useParams();
  console.log(ticketId, 'from param ');
  return (
    <div className="max-h-fit min-h-screen p-6 space-y-6  ">
      <div className="flex flex-col w-2/3 mx-auto">
        <Header id={ticketId} />
        <div className=" flex flex-row space-x-5">
          <div className="w-full flex flex-col space-y-5 ">
            <TicketDisplay
              id={ticketId}
              description={description}
              setDescription={setDescription}
              descriptionDisabled={descriptionDisabled}
              setDescriptionDisable={setDescriptionDisable}
            />
            <Comments id={ticketId} />
            <Comment id={ticketId} />
          </div>
          <Stats
            id={ticketId}
            description={description}
            setDescription={setDescription}
            setDescriptionDisable={setDescriptionDisable}
          />
        </div>
      </div>
    </div>
  );
}
export default Discussions;
