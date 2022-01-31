/* eslint-disable react/jsx-filename-extension */
import React from 'react';

const PassowordInput = ({
  label, id, onChange, validate, others,
}) => (
  <div className="col-12">
    <label htmlFor={id} className="form-label">{label}</label>
    <input type="password" className={`form-control ${validate}`} {...others} onChange={onChange} id={id} />
  </div>
);

export default PassowordInput;
