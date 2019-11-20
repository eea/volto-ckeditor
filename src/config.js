import CKEditorWidget from './CKEditor/Widget';

export function applyConfig(config) {
  return {
    ...config,
    widgets: {
      ...config.widgets,
      widget: {
        ...config.widgets.widget,
        cktext: CKEditorWidget,
      },
    },
  };
}
