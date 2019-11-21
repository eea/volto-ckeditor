import CKEditorWidget from './Widget/Widget';
import TextBlockView from './Block/View';
import TextBlockEdit from './Block/Edit';

export function applyConfig(config) {
  config.widgets.widget.cktext = CKEditorWidget;

  config.blocks.blocksConfig.cktext = {
    id: 'cktext',
    group: 'text',
    title: 'CKEditor',
    view: TextBlockView,
    edit: TextBlockEdit,
    icon: config.blocks.blocksConfig.text.icon,
  };

  return config;
}
