
function isObject (source) {
  return (typeof source === "object" || typeof source === 'function') && (source !== null)
} 


/**
 * @param {*} source 
 * @param {*} cacheMap 用来解决可能出现的循环引用
 * @returns 
 */
function deepclone (source, cacheMap = new Map()) {
  /**
   * 如果 source 是非 object 的基本类型
   * 则直接返回
   */
  if (!isObject(source)) {
    return source;
  }   

  if (cacheMap.has(source)) {
    return cacheMap.get(source);
  }

  let result = {};

  if (source instanceof Array) {
    result = [];
  }

  if (source instanceof Function) {
    result = function (...args) {
      return source.apply(this, args)
    }
  }

  if (source instanceof Date) {
    result = new Date(source);
  }

  if (source instanceof RegExp) {
    result = new RegExp(source.source, source.flags);
  }

  cacheMap.set(source, result);

  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      result[key] = deepclone(source[key], cacheMap)
    }
  }

  return result;
}
 
module.exports = deepclone