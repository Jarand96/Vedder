import React from "react";
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import renderInput from './renderInput';

const required = value => value ? undefined : 'Required'
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue1 = minValue(1)
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength40 = maxLength(40)

let SettingsForm = props => {
  const  {handleSubmit, callbackSubmit} = props;
  return(
  <form onSubmit={handleSubmit(callbackSubmit)}>
      <Field name="firstname" validate={[required, minValue1, maxLength40]} label="First name" type="text" component={renderInput}/>
      <Field name="lastname" validate={[required, minValue1, maxLength40]} label="Last name" type="text" component={renderInput}/>
    <Button type="submit">Submit</Button>
  </form>
  );
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
SettingsForm = reduxForm({
  form: 'settings',
  enableReinitialize: true // a unique identifier for this form
})(SettingsForm);

// You have to connect() to any reducers that you wish to connect to yourself
SettingsForm = connect(
  state => ({
    initialValues: state.user,
  })
)(SettingsForm);

export default SettingsForm;
