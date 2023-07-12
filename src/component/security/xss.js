import React, { useCallback, useState } from "react";

export const XSSDemo = () => {
  const [value, setValue] = useState("");

  const onClick = useCallback(() => {
    // const link = `http://xx?redirectTo=${value}`;

    document.body.append(value);

    setTimeout(value, 0);
  }, [value]);

  return (
    <div>
      <input value={value} onChange={event => setValue(event.target.value)} />
      您搜索的关键词是 {value}
      <button onClick={onClick}>click</button>
      <a href={`http://xx?redirectTo=${value}`}>click me</a>
      <div dangerouslySetInnerHTML={{ __html: value }}></div>
    </div>
  );
};
