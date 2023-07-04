function myNew(constructor, ...args) {
  let result = {};
  result.__proto__ = constructor.prototype;
  const constructorReturn = constructor.call(result, ...args);

  if (typeof constructorReturn === "object") {
    return constructorReturn;
  }
  return result;
}
