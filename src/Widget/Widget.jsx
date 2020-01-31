import React, { Component } from 'react';
import { map } from 'lodash';
import { Label } from 'semantic-ui-react';

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
      // title,
      // required,
      // description,
      error,
      value,
      onChange,
      // fieldSet,
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
      <>
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
      </>
    );
  }
}

export default CKEditorWidget;
