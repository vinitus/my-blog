import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { FilterTarget } from '@/utils/backtickAlgorithm';

type SetFilterTarget = React.Dispatch<React.SetStateAction<FilterTarget>>;
type StringDispatcher = React.Dispatch<React.SetStateAction<string>>;

export default function FormFilter({ filterTarget, setFilterTarget }: { filterTarget: FilterTarget; setFilterTarget: SetFilterTarget }) {
  const [includeWord, setIncldueWord] = useState('');
  const [excludeWord, setExcldueWord] = useState('');

  const enterFn = useMemo(() => enterHandler(setFilterTarget), [setFilterTarget]);

  return (
    <div className='border-b border-[var(--main-font)] px-2 my-2 py-1 pb-3'>
      <div className='text-[75%] leading-normal align-middle'>
        <Input placeholder='include' value={includeWord} dispatcher={setIncldueWord} enterFn={enterFn} />
        <Button>추가하기</Button>
        <span className='mr-2'>|</span>
        <TargetKeywordWrapper target='include' targetArr={filterTarget.include} />
      </div>

      <div className='text-[75%] leading-normal align-middle'>
        <Input placeholder='exclude' value={excludeWord} dispatcher={setExcldueWord} enterFn={enterFn} />
        <Button>추가하기</Button>
        <span className='mr-2'>|</span>
        <TargetKeywordWrapper target='exclude' targetArr={filterTarget.exclude} />
      </div>
    </div>
  );
}

interface InputProps {
  placeholder: 'include' | 'exclude';
  value: string;
  dispatcher: StringDispatcher;
  enterFn: (event: React.KeyboardEvent<HTMLInputElement>, target: 'include' | 'exclude', dispatcher: StringDispatcher, word: string) => void;
}

function Input({ placeholder, value, dispatcher, enterFn }: InputProps) {
  return (
    <input
      type='text'
      value={value}
      onChange={(event) => dispatcher(event.target.value)}
      onKeyDown={(event) => enterFn(event, placeholder, dispatcher, value)}
      placeholder={placeholder}
      className='border border-[#7a828e] rounded-md py-1 px-2 bg-[var(--main-bg)] text-[var(--main-font)] text-xs mr-2 my-1'
    />
  );
}

function Button({ children, className, isOverflow, style }: { children: string; className?: string; isOverflow?: boolean; style?: React.CSSProperties }) {
  let btnClass = 'border border-[#7a828e] rounded-md bg-[var(--main-bg)] text-[var(--main-font)] py-1 px-2 mr-2 my-1 w-auto hover:bg-[#1a1c20]';
  // const disabledClass = 'disabled:hover:bg-[var(--main-bg)] disabled:border-[#3a323e] disabled:text-[#a0a3a6]';
  const disabledClass = 'disabled:opacity-50 disabled:hover:bg-inherit';

  if (className) btnClass = className + ' ' + btnClass;

  return (
    <button type='button' style={style && style} className={btnClass + ' ' + disabledClass} disabled={isOverflow !== undefined && !isOverflow}>
      {children}
    </button>
  );
}

function scrollCalc(tag: HTMLElement): ArrowDir {
  const { offsetWidth, scrollLeft, scrollWidth } = tag;
  if (scrollLeft === 0) return 'left';
  if (scrollLeft === scrollWidth - offsetWidth) return 'right';
  return 'both';
}

type ArrowDir = 'left' | 'right' | 'both';

function arrowStateUpdateFn(leftDispatcher: React.Dispatch<React.SetStateAction<boolean>>, rightDispatcher: React.Dispatch<React.SetStateAction<boolean>>) {
  return (dir: ArrowDir | 'disabled') => {
    switch (dir) {
      case 'left': {
        leftDispatcher(false);
        rightDispatcher(true);
        break;
      }
      case 'right': {
        leftDispatcher(true);
        rightDispatcher(false);
        break;
      }
      case 'both': {
        leftDispatcher(true);
        rightDispatcher(true);
        break;
      }
      default: {
        leftDispatcher(false);
        rightDispatcher(false);
        break;
      }
    }
  };
}

function TargetKeywordWrapper({ targetArr, target }: { targetArr: string[]; target: 'include' | 'exclude' }) {
  const [leftIsOverflow, setleftIsOverflow] = useState(false);
  const [rightIsOverflow, setrightIsOverflow] = useState(false);
  const wordWrapSpanRef = useRef<HTMLSpanElement>(null);

  const arrowUpdateFn = useMemo(() => arrowStateUpdateFn(setleftIsOverflow, setrightIsOverflow), []);

  const scrollEventHandler = useCallback(() => {
    const wordWrapSpanTag = wordWrapSpanRef.current;
    if (!wordWrapSpanTag) {
      new Error('렌더링 오류');
      return;
    }
    arrowUpdateFn(scrollCalc(wordWrapSpanTag));
  }, [arrowUpdateFn]);

  useEffect(() => {
    const wordWrapSpanTag = wordWrapSpanRef.current;
    if (wordWrapSpanTag === null) {
      new Error('렌더링 오류');
      return;
    }

    const { offsetWidth, scrollWidth } = wordWrapSpanTag;
    if (offsetWidth === scrollWidth) {
      arrowUpdateFn('disabled');
      return;
    }

    arrowUpdateFn(scrollCalc(wordWrapSpanTag));
  }, [arrowUpdateFn, targetArr.length]);

  return (
    <span className='inline-flex h-9 w-[calc(100%-246px)] aria-hidden:bg-wheet'>
      <Button isOverflow={leftIsOverflow}>←</Button>
      <span className='overflow-x-scroll whitespace-nowrap w-full mx-2 pr-1 gap-1 flex' ref={wordWrapSpanRef} onScroll={scrollEventHandler}>
        {targetArr.map((item, idx) => (
          <Button key={`${target}-${idx}`} className='mr-0' style={{ marginRight: '0px' }}>
            {item}
          </Button>
        ))}
      </span>
      <Button className='ml-auto' isOverflow={rightIsOverflow}>
        →
      </Button>
    </span>
  );
}

function isDuplicated(arr: string[], str: string) {
  return arr.includes(str);
}

function enterHandler(filterTargetDispatcher: SetFilterTarget) {
  return (event: React.KeyboardEvent<HTMLInputElement>, target: 'include' | 'exclude', dispatcher: StringDispatcher, word: string) => {
    if (event.key !== 'Enter') return;
    filterTargetDispatcher((prev) => {
      if (isDuplicated(prev[target], word)) return prev;

      prev[target].push(word);
      return prev;
    });

    dispatcher('');
  };
}
