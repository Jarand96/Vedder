import React from "react";
import { reduxForm, Field } from 'redux-form'
import { Button } from 'react-bootstrap';

const required = value => value ? undefined : 'Required'
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue1 = minValue(1)
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength40 = maxLength(40)

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
  const  {handleSubmit} = props;
  return(
  <form onSubmit={handleSubmit}>
      <Field name="firstname" validate={[required, minValue1, maxLength40]} label="First name" type="text" component={renderInput}/>
      <Field name="lastname" validate={[required, minValue1, maxLength40]} label="Last name" type="text" component={renderInput}/>
      <Field name="email" validate={[email, required]} label="E-post" type="text" component={renderInput}/>
      <Field name="password" type="password" label="Password" component={renderInput}/>
    <Button type="submit">Submit</Button>
  </form>
  );
};

export default reduxForm({
  form:'register',
  validate
})(RegisterForm);
