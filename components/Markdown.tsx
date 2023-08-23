'use client';

import { useState, useEffect, useMemo } from 'react';
import MarkdownPreview from './MarkdownPreview';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import transformToSlateValue from '@/utils/transformToSlateValue';
import { isElement, isText } from '@/utils/typeguard';
import './markdown.css';

export default function Markdown({
  markdownDataObj,
}: {
  markdownDataObj: {
    markdownContent: string;
    filename: string;
  };
}) {
  const { markdownContent, filename } = markdownDataObj;
  const [editor, setEditor] = useState(() => withReact(createEditor()));
  const [renderFlag, setRenderFlag] = useState(0);

  const initialValue = useMemo(() => transformToSlateValue(markdownContent), [markdownContent]);

  useEffect(() => {
    setRenderFlag((prev) => prev + 1);
  }, []);

  useEffect(() => {
    console.log(editor.children[1].children[0].text);
  });

  return (
    <div className='flex flex-row' onFocus={() => console.log('focus')}>
      <div className='flex flex-col markdownCss' onClick={() => console.log('밖 클릭')}>
        <h1>{filename}</h1>
        <Slate
          editor={editor}
          initialValue={initialValue}
          onChange={() => {
            blur();
            console.log('change');
            setRenderFlag((prev) => prev + 1);
          }}
        >
          <Editable
            onDOMBeforeInput={(event) =>
              setEditor((prev) => {
                console.log(
                  prev.children[Number(editor.selection?.anchor.path[0])].children[0].text.substring(0, Number(editor.selection?.anchor.offset)) + event.data
                );
                return prev;
              })
            }
            className='w-full p-4'
            // onChange={() => console.log('에디터블체인지')}
            // onFocus={() => console.log('focus')}
            // onKeyDown={() => {
            //   console.log('keydown');
            //   // setRenderFlag((prev) => prev + 1);
            //   // setRenderFlag((prev) => prev + 1);
            //   // console.log(`${editor.selection?.anchor.offset} ${editor.selection?.anchor.path[0]}`);
            // }}
            // onKeyUp={() => {
            //   console.log('keyup');
            // }}
            // onBlur={() => {
            //   console.log('blur');
            // }}
            // onClick={() => {
            //   console.log('click');
            // }}
          />
        </Slate>
      </div>
      {renderFlag !== 0 && (
        <div className='w-full h-[calc(100vh-155px)]'>
          {editor.children.map((item, idx) => {
            // 타입가드를 통한 typescript 에러 해결
            if (isElement(item) && isText(item.children[0])) {
              // return item.children[0].text !== '\n' ? <MarkdownPreview markdownContent={item.children[0].text} key={idx} /> : <div key={idx} className='h-6' />;
              // return item.children[0].text !== '\r' ? <MarkdownPreview markdownContent={item.children[0].text} key={idx} /> : <div key={idx} className='h-6' />;
              // return item.children[0].text !== '\r\n' ? <MarkdownPreview markdownContent={item.children[0].text} key={idx} /> : <div key={idx} className='h-6' />;
              return item.children[0].text !== '' ? <MarkdownPreview markdownContent={item.children[0].text} key={idx} /> : <div key={idx} className='h-6' />;
              // return item.children[0].text !== '\n\r' ? (
              //   <MarkdownPreview markdownContent={item.children[0].text} key={idx} />
              // ) : (
              //   <div key={idx} className='h-6' />
              // );
            } else {
              // 이게 옳은 것일까? 는 모르겠음.. 모든 렌더링을 중단시킬 필요가 있을까
              throw new Error('Invalid text');
            }
          })}
        </div>
      )}
      {/* <MarkdownPreview markdownContent={markdown} /> */}
    </div>
  );
}
