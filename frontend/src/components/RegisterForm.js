import React from "react";
import { reduxForm, Field } from 'redux-form'
import isValidEmail from 'sane-email-validation'
import { Button } from 'react-bootstrap';

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined

const maxLength40 = maxLength(40)
const minLength2 = minLength(2)

const validate = values => {
  const errors = {}
  if (!values.username){
    errors.username = 'Required'
  }
  if (!values.password){
    errors.password = 'Required'
  }
  return errors
}

const renderInput = ({ input, type, label, meta}) =>
  <div>
    <label>{label}</label>
    <input {...input} type={type} id="text-input" placeholder={label} />
    {meta.error &&
     meta.touched &&
      <span>{meta.error}</span>}
  </div>

const RegisterForm = props => {
  const  {handleSubmit, callbackSubmit } = props;
  return(
  <form onSubmit={handleSubmit(callbackSubmit)}>
      <Field name="username" validate={[maxLength40, minLength2]} label="Lagnavn" type="text" component={renderInput}/>
      <Field name="password" type="password" label="Password" component={renderInput}/>
      <Field name="adminpassword" type="password" label="Admin Password" component={renderInput}/>
    <Button type="submit">Submit</Button>
  </form>
  );
};

export default reduxForm({
  form:'register',
  validate
})(RegisterForm);
