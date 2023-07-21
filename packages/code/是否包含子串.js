/**
 * a 是否包含在 b 中
 * @param {*} a
 * @param {*} b
 */
function isContain(a, b) {
  let start = -1;

  let right = 0,
    left = 0;
  while (right < b.length) {
    const char = b.charAt(right);

    right++;
  }
}

const square = v => v * v;
const double = v => v * 2;
const addOne = v => v + 1;
const res = pipe(square, double, addOne);
console.log(res(3)); // 19; addOne(double(square(3)))

function pipe(...executers) {
  return function pipedExecuter(...executerArguments) {
    return executers.reduce((previousExecuterResult, currentExecuter) => {
      return currentExecuter.call(this, previousExecuterResult);
    }, executerArguments);
  };
}
