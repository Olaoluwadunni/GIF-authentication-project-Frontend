/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import { Icon } from '@chakra-ui/react';

const PasswordInput = ({
  label, id, onChange, validate, others,
}) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const icon = passwordShown ? BsEyeSlash : BsEye;
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <div className="col-12">
      <label htmlFor={id} className="form-label">{label}</label>
      <div className="paswword-wrapper">
        <input type={passwordShown ? 'text' : 'password'} className={`form-control ${validate}`} {...others} onChange={onChange} id={id} />
        <Icon as={icon} pos="absolute" top="31%" left="90%" onClick={togglePasswordVisiblity} />
      </div>
    </div>
  );
};

export default PasswordInput;
