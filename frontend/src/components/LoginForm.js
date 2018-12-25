import React from "react";
import { reduxForm, Field} from 'redux-form';
import isValidEmail from 'sane-email-validation';
import { Button } from 'react-bootstrap';

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

const renderInput = ({ input, meta, label, type}) =>
  <div>
    <label className="input-label">{label}</label>
    <input {...input} type={type} placeholder={label} />
    {meta.error &&
     meta.touched &&
      <span>{meta.error}</span>}
  </div>

const LoginForm = props => {
  const  {handleSubmit, callbackSubmit } = props;
  return(
  <form onSubmit={handleSubmit(callbackSubmit)}>
      <Field name="username" type="text" label="Lagnavn" component={renderInput}/>
      <Field name="password" type="password" label="Passord" component={renderInput}/>
    <Button type="submit">Logg inn</Button>
  </form>
  );
};

export default reduxForm({
  form:'login',
  validate
})(LoginForm);
