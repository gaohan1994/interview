{
  // （百度）实现 (5).add(3).minus(2) 功能。

  Number.prototype.add = function add(num) {
    return this.valueOf() + num;
  };

  Number.prototype.minus = function (num) {
    return this.valueOf() - num;
  };
}
