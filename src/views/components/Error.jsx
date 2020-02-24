import React from 'react';

const Error = (props) => {
  if (props.message === null) return '';

  return <div className="alert alert-danger" role="alert">{props.message}</div>;
};

export default Error;