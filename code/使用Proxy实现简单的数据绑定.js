{
  // https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/123

  let obj = {
    name: "Ghan",
  };

  let proxyObj = new Proxy(obj, {
    get: function (target, key, receiver) {
      console.log("target", target);
      console.log("key", key);
      return Reflect.get(target, key, receiver);
    },
    set: function (target, key, newValue, receiver) {
      console.log("target", target);
      console.log("key", key);
      console.log("newValue", newValue);
      console.log("receiver", receiver);
      return Reflect.set(target, key, newValue, receiver);
    },
  });

  proxyObj.name = "Ghan";
}
