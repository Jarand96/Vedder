import React from "react";
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import renderInput from './renderInput';

const adaptFileEventToValue = delegate =>
  e => delegate(e.target.files[0])

const FileInput = ({
  input: {
    value: omitValue,
    onChange,
    onBlur,
    ...inputProps
  },
  meta: omitMeta,
  ...props
}) =>
  <input
    onChange={adaptFileEventToValue(onChange)}
    onBlur={adaptFileEventToValue(onBlur)}
    type="file"
    {...inputProps}
    {...props}
  />

let fileUploadForm = props => {
  const  {handleSubmit} = props;
  return(
  <form onSubmit={handleSubmit}>
    <Field component={FileInput} name="profile_pic" />
    <Button type="submit">Upload file</Button>
  </form>
  );
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
fileUploadForm = reduxForm({
  form: 'fileupload',
  enableReinitialize: true // a unique identifier for this form
})(fileUploadForm);


// You have to connect() to any reducers that you wish to connect to yourself
//fileUploadForm = connect(
//  state => ({
//    initialValues: state.user,
//  })
//)(fileUploadForm);

export default fileUploadForm;
