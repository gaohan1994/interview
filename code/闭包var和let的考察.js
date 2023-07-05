{
  // 改造下面的代码，使之输出0 - 9，写出你能想到的所有解法。
  // for (var i = 0; i < 10; i++) {
  //   setTimeout(() => {
  //     console.log(i);
  //   }, 1000);
  // }

  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      // console.log(i);
    }, 1000);
  }

  for (var i = 0; i < 10; i++) {
    (function (index) {
      setTimeout(() => {
        console.log(index);
      }, 1000);
    })(i);
  }
}
