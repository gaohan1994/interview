{
  // 已知数据格式，实现一个函数 fn 找出链条中所有的父级 id

  const data = [
    {
      id: "1",
      name: "test1",
      children: [
        {
          id: "11",
          name: "test11",
          children: [
            {
              id: "111",
              name: "test111",
            },
            {
              id: "112",
              name: "test112",
            },
          ],
        },
        {
          id: "12",
          name: "test12",
          children: [
            {
              id: "121",
              name: "test121",
            },
            {
              id: "122",
              name: "test122",
            },
          ],
        },
      ],
    },
  ];

  function findParents(id) {
    const result = [];

    function traverse(node) {
      if (!node.children) {
        if (node.id === id) {
          result.push(node.id);
          return true;
        } else {
          return false;
        }
      }

      const hasNodeId = node.children.map(traverse);

      let token = false;
      if (hasNodeId.some(item => item === true)) {
        token = true;
        result.push(node.id);
      }
      return token;
    }

    traverse(data[0]);

    return result;
  }

  const result = findParents("112");
  console.log("result", result);
}
