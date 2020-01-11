import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import CKTextWidget from './Widget';

const CKEditorField = props => {
  const { id, title, required, description, error, fieldSet } = props;
  return (
    <Form.Field
      inline
      required={required}
      error={error ? error.length > 0 : false}
      id={`${fieldSet || 'field'}-${id}`}
    >
      <Grid>
        <Grid.Row stretched>
          <Grid.Column width="4">
            <div className="wrapper">
              <label htmlFor={`field-${id}`}>{title}</label>
            </div>
          </Grid.Column>
          <Grid.Column width="8">
            <CKTextWidget {...props} />
          </Grid.Column>
        </Grid.Row>
        {description && (
          <Grid.Row stretched>
            <Grid.Column stretched width="12">
              <p className="help">{description}</p>
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    </Form.Field>
  );
};

export default CKEditorField;
