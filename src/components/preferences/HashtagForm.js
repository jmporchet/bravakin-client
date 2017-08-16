import React from 'react';
import { Field, reduxForm } from 'redux-form';

const HashtagForm = props => {
    const { handleSubmit } = props;
    return(
      <form onSubmit={handleSubmit}>
        <div>
        <label> Add a new Hashtag </label>
        <div>
          <Field
            name="hashtags"
            component="input"
            type="text"
            placeholder="hashtags"
            />
          </div>
        </div>
        <br/>
        <button type="submit">Submit</button>
      </form>
    );
  };

  export default reduxForm({
    form: 'simple',
  })(HashtagForm);
