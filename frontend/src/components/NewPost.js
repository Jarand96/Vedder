import React from 'react';
import { Field, reduxForm } from 'redux-form';

const NewPostForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(NewPostForm);
