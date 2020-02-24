import React from 'react';

const Success = (props) => {
  if (props.message === null) return '';

  return <div class="alert alert-success" role="alert">{props.message}</div>;
};

export default Success;