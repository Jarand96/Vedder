import React from "react";
import { reduxForm, Field } from 'redux-form'
import { Button } from 'react-bootstrap';

const required = value => value ? undefined : 'Required'
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

const renderInput = ({ input, type, label, inputvalue, meta}) =>
  <div>
    <label>{label}</label>
    <input {...input} type={type} id="text-input" placeholder={label} value={inputvalue} />
    {meta.error &&
     meta.touched &&
      <span>{meta.error}</span>}
  </div>

const SettingsForm = props => {
  const  {handleSubmit, callbackSubmit, initialValues } = props;
  return(
  <form onSubmit={handleSubmit(callbackSubmit)}>
      <Field name="firstname" validate={[required, minValue1, maxLength40]} label="First name" inputvalue={initialValues.firstname} type="text" component={renderInput}/>
      <Field name="lastname" validate={[required, minValue1, maxLength40]} label="Last name" inputvalue={initialValues.lastname} type="text" component={renderInput}/>
    <Button type="submit">Submit</Button>
  </form>
  );
};

export default reduxForm({
  form:'settings',
  validate
})(SettingsForm);
