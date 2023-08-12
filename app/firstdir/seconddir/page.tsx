'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Third() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Link href='/firstdir/seconddir/thirddir'>
        <h1>1번째 클라이언트 컴포넌트</h1>
      </Link>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
