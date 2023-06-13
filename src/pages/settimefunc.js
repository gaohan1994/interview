import React, { useState, useEffect } from 'react';

export default function () {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue((prev) => prev + 1);

    setTimeout(() => {
      setValue(value + 1);
      console.log('value in settime', value);
    }, 0);
    // console.log('value', value);
  }, []);

  return <div>function {value}</div>;
}
