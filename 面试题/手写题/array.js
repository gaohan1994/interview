Array.prototype.reduce2 = function (callback, initState) {
  let acc = initState ? initState : this[0];

  for (let i = 0; i < this.length; i++) {
    acc = callback(acc, this[i]);
  }
  return acc;
};
