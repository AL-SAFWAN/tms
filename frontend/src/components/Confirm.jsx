import React from 'react';

function Confirm({ fn, id, msg = 'delete' }) {
  return (
    <>
      <input type="checkbox" id={'delete' + id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Are you sure you want to perform this{' '}
            <span className="text-red-400">{msg}</span> function
          </p>
          <div className="modal-action">
            <label htmlFor={'delete' + id} className="btn btn-secondary">
              No
            </label>

            <label
              htmlFor={'delete' + id}
              className="btn btn-primary"
              onClick={() => fn()}
            >
              Yes
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Confirm;
