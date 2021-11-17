import { SelectableValue } from '@grafana/data';
import * as CSS from 'csstype';

export type CustomComponentType = 'markdown' | 'typewriter' | 'react-live';
export type CustomComponentBase<T extends CustomComponentType> = { type: T };
export type CustomComponentMarkdown = { content: string } & CustomComponentBase<'markdown'>;
export type CustomComponentTypeWriter = { content: string } & CustomComponentBase<'typewriter'>;
export type CustomComponentReactLive = { content: string } & CustomComponentBase<'react-live'>;
export type CustomComponent = CustomComponentMarkdown | CustomComponentTypeWriter | CustomComponentReactLive;
export type CustomPanelOptions = {
  // Content
  components: CustomComponent[];
  // Styles
  backgroundColor?: string;
  color?: string;
  padding?: string;
  backgroundImage?: string;
  textAlign?: CSS.Property.TextAlign;
};

//#region Selectable values
export const CustomComponentTypeOptions: Array<SelectableValue<CustomComponentType>> = [
  { value: 'markdown', label: 'MarkDown' },
  { value: 'typewriter', label: 'TypeWriter' },
  { value: 'react-live', label: 'React Live' },
];
//#endregion
