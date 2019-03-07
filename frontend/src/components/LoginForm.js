import React from "react";
import { reduxForm, Field} from 'redux-form';
import isValidEmail from 'sane-email-validation';
import { Button } from 'react-bootstrap';

const required = value => value ? undefined : 'Required'
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined

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
  const  {handleSubmit} = props;
  return(
  <form onSubmit={handleSubmit}>
      <Field name="email" validate={[email, required]} label="E-post" type="text" component={renderInput}/>
      <Field name="password" type="password" label="Passord" component={renderInput}/>
    <Button type="submit">Logg inn</Button>
  </form>
  );
};

export default reduxForm({
  form:'login',
  validate
})(LoginForm);
