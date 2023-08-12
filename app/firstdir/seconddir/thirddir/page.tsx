'use client';

import { useState } from 'react';
import Button from '@/app/firstdir/seconddir/thirddir/Button';

export default function Third() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>2번째 클라이언트 컴포넌트</h1>
      <p>You clicked {count} times</p>
      <Button onClickHandler={() => setCount(count + 1)}>Click me</Button>
    </div>
  );
}
