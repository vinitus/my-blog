'use client';

import { Dispatch, SetStateAction, use, useRef, useState } from 'react';

async function Data2() {
  const res = await fetch('https://dcb7a8e3-965b-4d6a-8a40-ff96b332a2fc.mock.pstmn.io/hello');

  const jsonData = await res.json();

  const { a } = jsonData;

  return a;
}

export default function Button() {
  const aTag = useRef(<div>1</div>);

  console.log(1);
  if (aTag.current.props.children === '1') {
    aTag.current = <div>{use(Data2())}</div>;
    console.log(2);
  }
  console.log(3);
  const [count, setCount] = useState(0);

  function counter(prev: number, dispatcher: Dispatch<SetStateAction<number>>) {
    return () => dispatcher(prev + 1);
  }

  return (
    <button onClick={counter(count, setCount)}>
      {aTag.current}
      <p>{count}</p>
    </button>
  );
}
