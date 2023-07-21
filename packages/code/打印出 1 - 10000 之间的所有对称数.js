{
  // 打印出 1 - 10000 之间的所有对称数
  // 例如：121、1331 等

  function findNumberHandler() {
    return [...Array(10000).keys()].filter(item => {
      return `${item}`.length > 1 && item === Number(item.toString().split("").reverse().join(""));
    });
  }

  console.log(findNumberHandler());
}
