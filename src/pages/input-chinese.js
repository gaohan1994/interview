import React, { useCallback } from "react";

function InputChinese() {
  const composingRef = React.useRef(false);
  const [value, setValue] = React.useState("");

  const onInput = event => {
    console.log("on input", event.target.value);
    setValue(event.target.value);
  };

  const onCompositionStart = event => {
    console.log("onCompositionStart", event.target.value);
    composingRef.current = true;
  };

  const onCompositionEnd = event => {
    console.log("onCompositionEnd", event.target.value);
    composingRef.current = false;
    onInput(event);
  };

  return (
    <div>
      <span>title</span>
      <input
        value={value}
        onChange={onInput}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
      />
    </div>
  );
}

export { InputChinese };
