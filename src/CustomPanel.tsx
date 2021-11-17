import React from 'react';
import { PanelProps } from '@grafana/data';
import { MarkdownComponent } from './components/Markdown';
import { TypeWriterComponent } from './components/TypeWriter';
import { ReactLiveComponent } from './components/ReactLive';
import { getStyle } from './styles';
import { CustomPanelOptions } from './types';

export const CustomPanel = (props: PanelProps<CustomPanelOptions>) => {
  const { options, data, width, height } = props;
  const { components = [] } = options;
  const styles = getStyle(width, height, options);
  return (
    <div style={styles.container}>
      {components.map((component) => {
        return (
          <>
            {component.type === 'markdown' && <MarkdownComponent component={component} />}
            {component.type === 'typewriter' && <TypeWriterComponent component={component} />}
            {component.type === 'react-live' && <ReactLiveComponent component={component} width={width} height={height} data={data} />}
          </>
        );
      })}
    </div>
  );
};
