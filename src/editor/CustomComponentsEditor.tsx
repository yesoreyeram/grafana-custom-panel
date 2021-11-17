import React from 'react';
import { Button, Select, TextArea, CodeEditor, HorizontalGroup, InlineFormLabel } from '@grafana/ui';
import { StandardEditorProps } from '@grafana/data';
import { CustomComponent, CustomComponentType, CustomComponentTypeOptions } from '../types';
import 'animate.css';

export const CustomComponentsEditor = (props: StandardEditorProps<CustomComponent[]>) => {
  const { value: components = [], onChange } = props;
  const addComponent = () => {
    onChange([...components, { type: 'markdown', content: '# Default markdown content.\n\nChange to different component type' }]);
  };
  const removeComponent = (index: number) => {
    components.splice(index, 1);
    onChange([...components]);
  };
  const onComponentTypeChange = (i: number, type: CustomComponentType) => {
    onChange(
      components.map((c, j) => {
        if (j === i) {
          return { ...c, type };
        } else {
          return { ...c };
        }
      })
    );
  };
  const onComponentContentChange = (i: number, content: string) => {
    onChange(
      components.map((c, j) => {
        if (j === i) {
          return { ...c, content };
        } else {
          return { ...c };
        }
      })
    );
  };
  const swapArrayLocs = (arr: CustomComponent[], index1: number, index2: number) => {
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
    return arr;
  };
  const moveComponents = (index: number, direction: 'up' | 'down') => {
    const newComponents: CustomComponent[] = [...components];
    onChange(swapArrayLocs(newComponents, index, direction === 'up' ? index - 1 : index + 1));
  };
  return (
    <>
      {components.map((c, i) => {
        return (
          <>
            <HorizontalGroup>
              <InlineFormLabel>Component Type</InlineFormLabel>
              <Select<CustomComponentType>
                placeholder="Select component type"
                onChange={(e) => onComponentTypeChange(i, e.value!)}
                options={CustomComponentTypeOptions}
                value={c.type}
              ></Select>
            </HorizontalGroup>
            {c.type === 'markdown' && (
              <>
                <TextArea
                  placeholder="Markdown content"
                  css={null}
                  rows={10}
                  value={c.content}
                  onChange={(e) => onComponentContentChange(i, e.currentTarget.value)}
                ></TextArea>
              </>
            )}
            {c.type === 'typewriter' && (
              <>
                <TextArea
                  placeholder="Typewriter content"
                  css={null}
                  rows={10}
                  value={c.content}
                  onChange={(e) => onComponentContentChange(i, e.currentTarget.value)}
                ></TextArea>
              </>
            )}
            {c.type === 'react-live' && (
              <>
                <CodeEditor
                  value={c.content}
                  language="html"
                  height="200px"
                  width="auto"
                  showMiniMap={false}
                  showLineNumbers={false}
                  onBlur={(e) => onComponentContentChange(i, e)}
                  onSave={(e) => onComponentContentChange(i, e)}
                />
              </>
            )}
            <HorizontalGroup>
              <Button size="sm" variant="destructive" icon="trash-alt" onClick={() => removeComponent(i)}>
                Delete
              </Button>
              {i !== 0 && (
                <Button icon="arrow-up" size="sm" variant="secondary" onClick={() => moveComponents(i, 'up')}>
                  Move Up
                </Button>
              )}
              {i !== components.length - 1 && (
                <Button icon="arrow-down" size="sm" variant="secondary" onClick={() => moveComponents(i, 'down')}>
                  Move Down
                </Button>
              )}
            </HorizontalGroup>
            <hr />
          </>
        );
      })}
      <br />
      <HorizontalGroup>
        <Button size="sm" variant="primary" icon="plus" onClick={addComponent}>
          Add Component
        </Button>
      </HorizontalGroup>
    </>
  );
};
