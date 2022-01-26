/* eslint-disable react/jsx-filename-extension */
import React from 'react';

const PassowordInput = ({ label }) => (
  <div className="mb-3 col-12">
    <label htmlFor="exampleInputPassword1" className="form-label">{label}</label>
    <input type="password" className="form-control" id="exampleInputPassword1" />
  </div>
);

export default PassowordInput;
