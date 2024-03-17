import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-fit text-center space-y-5">
        <div className="text-8xl text-error font-bold">404</div>
        <div className="text-4xl text-secondary italic">
          This page does not exist
        </div>
        <div className="text-2xl text-secondary/30 italic">
          The page you are looking for could not be found
        </div>
        <Link to={'/'} className="btn btn-lg ">
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
