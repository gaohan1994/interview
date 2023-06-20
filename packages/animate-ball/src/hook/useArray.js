import { useState } from "react";

function useArray(initialzeValue = []) {
  const [value, setValue] = useState(initialzeValue);

  const push = item => setValue(prevValue => [...prevValue, item]);

  const remove = index => setValue(prevValue => prevValue.filter((_, i) => i !== index));

  const isEmpty = () => value.length === 0;

  return {
    value,
    setValue,
    push,
    remove,
    isEmpty,
  };
}

export { useArray };
