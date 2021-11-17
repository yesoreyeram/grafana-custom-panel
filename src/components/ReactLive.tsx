import React from 'react';
import { LiveProvider, LiveError, LivePreview } from 'react-live';
import * as ui from '@grafana/ui';
import * as runtime from '@grafana/runtime';
import { simplifyPanelData } from './../utils';
import { CustomComponentReactLive } from './../types';

const Print = (props: { data: unknown }) => {
  return <pre>{JSON.stringify(props.data, null, 4)}</pre>;
};

export const ReactLiveComponent = (props: { component: CustomComponentReactLive; width: number; height: number; data: any }) => {
  const { data, width, height, component } = props;
  const theme = ui.useTheme2();
  const reactLiveScope = {
    data,
    simplify: simplifyPanelData,
    width,
    height,
    theme,
    Print,
    ui,
    runtime,
  };

  return (
    <>
      <LiveProvider code={component.content} scope={reactLiveScope}>
        <LivePreview />
        <LiveError />
      </LiveProvider>
    </>
  );
};
