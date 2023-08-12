'use Client';

import { ReactNode, useState } from 'react';

interface Props {
  onClickHandler: () => void;
  children: ReactNode;
}

export default function Button({ onClickHandler, children }: Props) {
  const [a, setA] = useState();
  return <button onClick={onClickHandler}>{children}</button>;
}
