/* eslint-disable react/jsx-filename-extension */
import React from 'react';

const InputBox = ({
  id, type, label, onChange, validate, others, value,
}) => (
  <div className="col-12">
    <label htmlFor={id} className="form-label">{label}</label>
    <input value={value} type={type} className={`form-control ${validate}`} id={id} {...others} onChange={onChange} required />
  </div>
);

export default InputBox;
