import { PanelPlugin } from '@grafana/data';
import { CustomPanel } from './CustomPanel';
import { TextAreaEditor } from './editor/TextAreaEditor';
import { CustomComponentsEditor } from './editor/CustomComponentsEditor';
import { CustomPanelOptions } from './types';

export const plugin = new PanelPlugin<CustomPanelOptions>(CustomPanel)
  .setPanelOptions((builder) => {
    return builder
      .addCustomEditor({
        id: 'components',
        name: '',
        path: 'components',
        defaultValue: [],
        editor: CustomComponentsEditor,
        category: ['Custom Components'],
      })
      .addCustomEditor({
        id: 'header',
        path: 'header',
        name: 'header',
        editor: TextAreaEditor,
        category: ['Header'],
      })
      .addCustomEditor({
        id: 'footer',
        path: 'footer',
        name: 'footer',
        editor: TextAreaEditor,
        category: ['Footer'],
      })
      .addColorPicker({
        path: 'backgroundColor',
        name: 'backgroundColor',
        category: ['Styles'],
      })
      .addColorPicker({
        path: 'color',
        name: 'color',
        category: ['Styles'],
      })
      .addTextInput({
        path: 'backgroundImage',
        name: 'backgroundImage',
        category: ['Styles'],
      })
      .addTextInput({
        path: 'padding',
        name: 'padding',
        defaultValue: '10px',
        category: ['Styles'],
      })
      .addRadio({
        path: 'textAlign',
        name: 'textAlign',
        defaultValue: 'left',
        settings: {
          options: [
            { value: 'left', label: 'Left' },
            { value: 'center', label: 'Center' },
            { value: 'right', label: 'Right' },
          ],
        },
        category: ['Styles'],
      });
  })
  .useFieldConfig();
