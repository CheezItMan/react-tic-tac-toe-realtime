import { useState } from 'react';

export function useToggle<T>(startValue: T, otherValue: T): [T, () => void] {
  const [value, setValue] = useState<T>(startValue);
  const toggle = () =>
    setValue((prevValue: T) => {
      return prevValue === startValue ? otherValue : startValue;
    });
  return [value, toggle];
}
