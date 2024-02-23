import React from 'react';

function Comments() {
  return (
    <>
      {' '}
      <div className="divider divider-start font-bold"> 2 comment</div>
      <div className="card w-full bg-base-100 shadow">
        <div className="card-body">
          <div className="flex flex-row items-center justify-between">
            <div className="avatar placeholder items-center space-x-2">
              <div className="bg-neutral text-neutral-content rounded-full w-8">
                <span>VB</span>
              </div>
              <span className="font-semibold italic">verybomb </span>
            </div>
          </div>
          <p>
            Hey, is there any updates on this or any work around that I could
            implement? I'm new to react so I'm not sure how to move forward from
            this. I believe the matter should be urgent, since ECS are used in
            games and rapier is a physic engine for games, which goes hand in
            hand
          </p>
        </div>
      </div>
      <div className="card w-full bg-base-100 shadow">
        <div className="card-body">
          <div className="flex flex-row items-center justify-between">
            <div className="avatar placeholder items-center space-x-2">
              <div className="bg-neutral text-neutral-content rounded-full w-8">
                <span>VB</span>
              </div>
              <span className="font-semibold italic">verybomb </span>
              <span className="font-thin text-sm text-slate-200">
                on Dec 21, 2023
              </span>
            </div>
          </div>
          <p>
            Has anyone been able to make newer versions of react-three-rapier
            work with miniplex? It used to be really simple up until some recent
            version I think (after at least 0.9). Here's how you'd assign a
            RigidBody to an entity component:
          </p>
        </div>
      </div>
    </>
  );
}

export default Comments;
