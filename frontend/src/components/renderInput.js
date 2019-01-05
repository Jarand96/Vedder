import React from 'react';

export const renderInput = ({
  input,
  type,
  label,
  meta: { touched, error, warning }
}) =>
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} id="text-input" placeholder={label} />
      {touched &&
             ((error && <span>{error}</span>) ||
               (warning && <span>{warning}</span>))}
    </div>
  </div>

export default renderInput
