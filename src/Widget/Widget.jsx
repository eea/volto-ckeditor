import React, { Component } from 'react';
import { map } from 'lodash';
import { Label } from 'semantic-ui-react';
import { Form, Grid } from 'semantic-ui-react';

class CKEditorWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CKEditor: null,
      ClassicEditor: null,
    };
  }
  componentDidMount() {
    if (__SERVER__) return;
    import(/* webpackChunkName: 'ckeditor' */ '@ckeditor/ckeditor5-react').then(
      module => {
        this.setState({ CKEditor: module.default }, () => {
          import(
            /* webpackChunkName: 'classiCk' */ '@ckeditor/ckeditor5-build-classic'
          ).then(module => this.setState({ ClassicEditor: module.default }));
        });
      },
    );
  }

  render() {
    const {
      id,
      title,
      required,
      description,
      error,
      value,
      onChange,
      fieldSet,
    } = this.props;

    const editorConfiguration = {
      heading: {
        options: [
          // {
          //   model: 'paragraph',
          //   title: 'Paragraph Tibi',
          //   class: 'ck-heading_paragraph',
          // },
          {
            model: 'heading5',
            view: 'h5',
            title: 'Block Title (H5)',
            class: 'ck-heading_heading5',
          },
          {
            model: 'block_description',
            view: {
              name: 'div',
              classes: 'chart-highlight',
            },
            title: 'Block Description',
            class: 'chart-highlight',
          },
          // {
          //   model: 'heading2',
          //   view: 'h2',
          //   title: 'Heading 2',
          //   class: 'ck-heading_heading2',
          // },
        ],
      },
    };

    const { CKEditor, ClassicEditor } = this.state;
    if (!(CKEditor && ClassicEditor)) return 'Loading...';

    return (
      <Form.Field
        inline
        required={required}
        className={description ? 'help ckeditor' : 'ckeditor'}
        id={`${fieldSet || 'field'}-${id}`}
      >
        <Grid>
          <Grid.Row>
            <Grid.Column width="12">
              <div className="wrapper">
                <label htmlFor="field-align">{title}</label>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column columns={12}>
              <CKEditor
                id={`field-${id}`}
                name={id}
                config={editorConfiguration}
                editor={ClassicEditor}
                data={value || ''}
                onInit={editor => {}}
                onChange={(event, editor) => onChange(id, editor.getData())}
                onBlur={(event, editor) => {}}
                onFocus={(event, editor) => {}}
              />
              {map(error, message => (
                <Label key={message} basic color="red" pointing>
                  {message}
                </Label>
              ))}
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
  }
}

export default CKEditorWidget;
