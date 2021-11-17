import React from 'react';
import { textUtil } from '@grafana/data';
import Typewriter, { TypewriterClass } from 'typewriter-effect';
import { CustomComponentTypeWriter } from './../types';

export const TypeWriterComponent = (props: { component: CustomComponentTypeWriter }) => {
  const { component } = props;
  const typeWriterInit = (typewriter: TypewriterClass, component: CustomComponentTypeWriter) => {
    typewriter = (component.content || '')
      .split('\n')
      .filter((t) => !t.startsWith('--')) // Use -- for comments
      .filter(Boolean)
      .reduce((t, line) => {
        const sanitizedLine = textUtil.sanitize(line);
        const command = sanitizedLine.split(' ')?.[0];
        const remainingText = sanitizedLine.replace(command + ' ', '');
        switch (command.toUpperCase()) {
          case 'DELETE':
            if (remainingText && !remainingText.toUpperCase().startsWith('ALL')) {
              t.deleteChars(+remainingText);
            } else {
              t.deleteAll();
            }
            break;
          case 'WAIT':
          case 'PAUSE':
            t.pauseFor((+remainingText || 1) * 1000);
            break;
          case 'TYPE':
            t.typeString(remainingText);
            break;
          default:
            t.typeString(sanitizedLine)
              .pauseFor(2 * 1000)
              .deleteAll();
            break;
        }
        return t;
      }, typewriter);
    typewriter.start();
  };
  return (
    <h1>
      <Typewriter options={{ autoStart: true, loop: true }} onInit={(t) => typeWriterInit(t, component)} />
    </h1>
  );
};
