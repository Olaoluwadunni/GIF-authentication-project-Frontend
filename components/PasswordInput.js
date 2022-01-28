/* eslint-disable react/jsx-filename-extension */
import React from 'react';

const PassowordInput = ({ label, id }) => (
  <div className="mb-3 col-12">
    <label htmlFor={id} className="form-label">{label}</label>
    <input type="password" className="form-control" id={id} />
  </div>
);

export default PassowordInput;
