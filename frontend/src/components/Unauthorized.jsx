import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export const Unauthorized = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-fit text-center space-y-5">
        <div className="text-8xl text-error font-bold">401</div>
        <div className="text-4xl text-secondary italic">
          You do not have access to this page
        </div>
        <div className="text-2xl text-secondary/30 italic">
          The page you are looking for can not be access with your role
        </div>
        <Link to={'/'} className="btn btn-lg ">
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
