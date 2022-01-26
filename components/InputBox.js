/* eslint-disable react/jsx-filename-extension */
import React from 'react';

const InputBox = ({ id, type, label }) => (
  <div className="mb-3 col-12">
    <label htmlFor={id} className="form-label">{label}</label>
    <input type={type} className="form-control" id={id} />
  </div>
);

export default InputBox;
