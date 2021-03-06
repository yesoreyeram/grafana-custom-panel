import React from 'react';
import { TextArea } from '@grafana/ui';
import { StandardEditorProps } from '@grafana/data';

export const TextAreaEditor = ({ value, onChange }: StandardEditorProps<string>) => {
  return <TextArea css={null} rows={3} value={value} onChange={(e) => onChange(e.currentTarget.value)}></TextArea>;
};
