import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'reactstrap';
import './bootstrap.css';

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
            className="form-control"
            />
          </div>
        </div>
        <br/>
        <Button color="primary" size="lg">Submit</Button>
      </form>
    );
  };

  export default reduxForm({
    form: 'HashtagForm',
  })(HashtagForm);
