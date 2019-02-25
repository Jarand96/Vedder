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

const adaptFileEventToValue = delegate =>
  e => delegate(e.target.files[0])

const FileInput = ({
  input: {
    value: omitValue,
    onChange,
    onBlur,
    ...inputProps,
  },
  meta: omitMeta,
  ...props,
}) =>
  <input
    onChange={adaptFileEventToValue(onChange)}
    onBlur={adaptFileEventToValue(onBlur)}
    type="file"
    {...inputProps}
    {...props}
  />

let SettingsForm = props => {
  const  {handleSubmit, callbackSubmit} = props;
  return(
  <form onSubmit={handleSubmit(callbackSubmit)}>
      <Field component={FileInput} name="avatar" />
    <Button type="submit">Upload file</Button>
  </form>
  );
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
SettingsForm = reduxForm({
  form: 'fileupload',
  enableReinitialize: true // a unique identifier for this form
})(SettingsForm);

// You have to connect() to any reducers that you wish to connect to yourself
SettingsForm = connect(
  state => ({
    initialValues: state.user,
  })
)(SettingsForm);

export default SettingsForm;
