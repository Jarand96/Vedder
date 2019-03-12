import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderInput from './renderInput';
import FieldFileInput from './FieldFileInput';

const adaptFileEventToValue = delegate =>
  e => {
    //Convert FileList to array.
    let filelist_array = Array.from(e.target.files)
    delegate(filelist_array)
  }
  
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
    multiple
    {...inputProps}
    {...props}
  />

const NewPostForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
        <Field name="text_content" type="textarea" component={renderInput}/>
        <Field name="file_content" value={null} component={FileInput} />

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(NewPostForm);
