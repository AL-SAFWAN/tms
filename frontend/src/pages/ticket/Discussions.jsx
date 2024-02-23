import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TicketDisplay from './TicketDisplay';
import Header from './Header';
import Comments from './Comments';
import Comment from './Comment';
import Stats from './Stats';

function Discussions() {
  const [descriptionDisabled, setDescriptionDisable] = useState(true);
  const [description, setDescription] = useState(true);
  const { state } = useLocation();
  return (
    <div className="max-h-fit min-h-screen p-6 space-y-6  ">
      <div className="flex flex-col w-2/3 mx-auto">
        <Header id={state.id} />
        <div className=" flex flex-row space-x-5">
          <div className="w-full flex flex-col space-y-5 ">
            <TicketDisplay
              id={state.id}
              description={description}
              setDescription={setDescription}
              descriptionDisabled={descriptionDisabled}
              setDescriptionDisable={setDescriptionDisable}
            />
            {/* <Comments /> */}
            <Comment />
          </div>
          <Stats
            id={state.id}
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
