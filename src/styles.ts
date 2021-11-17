import { CustomPanelOptions } from 'types';
import { normalizeColor } from './utils';

export const getStyle = (
  width: number,
  height: number,
  options: Pick<CustomPanelOptions, 'backgroundImage' | 'backgroundColor' | 'color' | 'textAlign' | 'padding'>
): Record<string, React.CSSProperties> => {
  return {
    container: {
      backgroundColor: normalizeColor(options.backgroundColor) || '',
      backgroundImage: options.backgroundImage ? `url("${options.backgroundImage}")` : '',
      backgroundSize: 'cover',
      color: normalizeColor(options.color) || '',
      textAlign: options.textAlign || 'left',
      padding: options.padding || '10px',
      height: height,
      width: width,
      overflow: 'auto',
    },
  };
};
