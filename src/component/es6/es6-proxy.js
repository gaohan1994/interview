import React, { Fragment } from "react";

const object = {
  name: "harper",
};

const proxyObject = new Proxy(object, {
  get(target, key) {
    console.log("target", target);
    console.log("key", key);
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    console.log("target", target);
    console.log("key", key);
    console.log("value", value);
    return Reflect.set(target, key, value);
  },
});

export const ES6Proxy = () => {
  const onTriggerProxy = () => {
    console.log("proxyObject.name", proxyObject.name);

    proxyObject.name = "Harper.Gao";
  };

  return (
    <Fragment>
      ES6Proxy
      <button onClick={onTriggerProxy}>Try trigger proxy</button>
    </Fragment>
  );
};
