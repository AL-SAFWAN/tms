import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TicketBody from './TicketBody';
import TicketHeader from './TicketHeader';
import Comments from './Comments';
import Comment from './Comment';
import Controls from './Controls';

function Discussions() {
  const [descriptionDisabled, setDescriptionDisable] = useState(true);
  const [description, setDescription] = useState(true);
  let { ticketId } = useParams();
  return (
    <div className="max-h-fit min-h-screen p-6 space-y-6  ">
      <div className="flex flex-col w-2/3 mx-auto">
        <TicketHeader id={ticketId} />
        <div className=" flex flex-row space-x-5">
          <div className="w-full flex flex-col space-y-5 ">
            <TicketBody
              id={ticketId}
              description={description}
              setDescription={setDescription}
              descriptionDisabled={descriptionDisabled}
              setDescriptionDisable={setDescriptionDisable}
            />
            <Comments id={ticketId} />
            <Comment id={ticketId} />
          </div>
          <Controls
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
