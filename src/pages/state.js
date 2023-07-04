import React, { useState, useEffect, useRef } from "react";
function StatePage() {
  const ref = useRef(false);
  const [value, setValue] = useState(0);

  const onClick = () => {
    setValue(value + 1);
    setValue(value + 1);
  };

  useEffect(() => {
    console.log("useEffect");
    if (!ref.current) {
      ref.current = true;
      setValue(value + 1);
      console.log(value);
      setValue(value + 1);
      console.log(value);

      Promise.resolve().then(() => {
        setValue(prev => prev + 1);
        console.log(value);

        setValue(prev => prev + 1);
        console.log(value);
      });
    }
  }, []);

  console.log("render");

  return <div onClick={onClick}>{value}</div>;
}
export { StatePage };
