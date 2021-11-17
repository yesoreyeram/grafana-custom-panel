import React from 'react';
import { renderMarkdown } from '@grafana/data';
import { CustomComponentMarkdown } from './../types';

export const MarkdownComponent = (props: { component: CustomComponentMarkdown }) => {
  const { component } = props;
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: renderMarkdown(component.content || '') }}></div>
    </>
  );
};
