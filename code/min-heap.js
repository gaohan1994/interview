function push(heap, node) {
  const index = heap.length;
  heap.push(node);
  siftUp(heap, node, index);
}

function pop(heap) {
  if (heap.length === 0) {
    return null;
  }

  const firstNode = heap[0];
  const lastNode = heap.pop();

  if (firstNode !== lastNode) {
    heap[0] = lastNode;
    siftDown(heap, lastNode, 0);
  }

  return firstNode;
}

function siftDown(heap, node, i) {
  let index = i;
  const length = heap.length;
  const halfLength = length >>> 1;
  while (index < halfLength) {
    const leftIndex = (index + 1) * 2 - 1;
    const left = heap[leftIndex];

    const rightIndex = leftIndex + 1;
    const right = heap[rightIndex];

    if (compare(left, node) < 0) {
      // left 比 node 小

      if (rightIndex < length && compare(right, left) < 0) {
        // right 比 left 小 说明 right 最小
        heap[index] = right;
        heap[rightIndex] = node;
        index = rightIndex;
      } else {
        heap[index] = left;
        heap[leftIndex] = node;
        index = leftIndex;
      }
    } else if (rightIndex < length && compare(right, node) < 0) {
      // left 比 node 大，right 比 node 小
      heap[index] = right;
      heap[rightIndex] = node;
      index = rightIndex;
    } else {
      // node 已经是最小的了
      return;
    }
  }
}

function siftUp(heap, node, i) {
  let index = i;

  while (index > 0) {
    // 获取父节点的 index
    // 无符号右移运算符（>>>）（零填充右移）
    // 将左操作数计算为无符号数，并将该数字的二进制表示形式移位为右操作数指定的位数，取模 32。
    // 向右移动的多余位将被丢弃，零位从左移入。其符号位变为 0，因此结果始终为非负数。
    // 与其他按位运算符不同，零填充右移返回一个无符号 32 位整数。
    // 这个操作等于 Math.floor((index - 1) / 2)
    const parentIndex = (index - 1) >>> 1;
    const parent = heap[parentIndex];

    if (compare(parent, node) > 0) {
      heap[parentIndex] = node;
      heap[index] = parent;
      index = parentIndex;
    } else {
      return;
    }
  }
}

function compare(a, b) {
  const diff = a.sortIndex - b.sortIndex;
  return diff !== 0 ? diff : a.id - b.id;
}

function peek(heap) {
  return heap.length === 0 ? null : heap[0];
}

// 测试代码
let taskQueue = [{ sortIndex: 2 }, { sortIndex: 7 }, { sortIndex: 5 }];
push(taskQueue, { sortIndex: 4 });
push(taskQueue, { sortIndex: 6 });
push(taskQueue, { sortIndex: 10 });
push(taskQueue, { sortIndex: 1 });
console.log(JSON.stringify(taskQueue));
pop(taskQueue);
console.log(JSON.stringify(taskQueue));
