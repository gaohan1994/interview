/**
 * 将节点插入到尾部然后从尾部开始上浮
 * @param {*} heap 最小堆
 * @param {*} node 要插入的节点
 */
export function push(heap, node) {
  const length = heap.length;
  heap[length] = node;
  siftUp(heap, node, length);
}

/**
 * 将第一个节点取出返回
 * 然后将最后一个节点挪到堆首，在不断下沉
 * @param {*} heap
 */
export function pop(heap) {
  const node = peek(heap);

  if (node !== null) {
    const lastNode = heap.pop();
    heap[0] = lastNode;
    siftDown(heap, lastNode, 0);
  }

  return node;
}

function siftUp(heap, node, i) {
  let index = i;

  while (index > 0) {
    // index >>> 1 => Math.floor(index / 2)
    const parentIndex = (index - 1) >>> 1;
    const parent = heap[parentIndex];

    if (compare(parent, node) > 0) {
      // 如果 parent 比 node 大则 node 应该上浮
      heap[parentIndex] = node;
      heap[index] = parent;
      index = parentIndex;
    } else {
      // parent 比 node 小，不用上浮了
      return;
    }
  }
}

function siftDown(heap, node, i) {
  let index = i;
  const halfLength = heap.length >>> 1;

  while (index < halfLength) {
    const leftIndex = (index + 1) * 2;
    const left = heap[leftIndex];

    const rightIndex = leftIndex + 1;
    const right = heap[rightIndex];

    if (compare(left, node) < 0) {
      // 如果左子结点比 node 小，说明应该将 node 下沉

      if (rightIndex < length && compare(right, left) < 0) {
        // 如果右子节点比左子节点还小，说明右子节点最小

        heap[index] = right;
        heap[rightIndex] = node;
        index = rightIndex;
      } else {
        heap[index] = left;
        heap[leftIndex] = node;
        index = leftIndex;
      }
    } else if (rightIndex < length && compare(right, node) < 0) {
      // 右子节点比 node 小

      heap[index] = right;
      heap[rightIndex] = node;
      index = rightIndex;
    } else {
      return;
    }
  }
}

export function peek(heap) {
  return heap.length === 0 ? null : heap[0];
}

/**
 * 比较两个节点的大小，key 为 sortIndex
 * 如果没有 sortIndex 则用 id
 * @param {*} a
 * @param {*} b
 */
function compare(a, b) {
  const diff = a.sortIndex - b.sortIndex;
  return typeof diff === "number" ? diff : a.id - b.id;
}
