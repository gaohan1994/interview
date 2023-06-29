/*
 * @lc app=leetcode.cn id=23 lang=javascript
 *
 * [23] 合并 K 个升序链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     val = (val===undefined ? 0 : val)
 *     next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  let dummy = new ListNode(-1),
    p = dummy;

  createHeap(lists);

  while (peek() !== null) {
    const minNode = pop();

    if (minNode) {
      p.next = minNode;
      p = p.next;
    }
  }

  return dummy.next;
};

let heap = [];

function createHeap(lists) {
  for (let index = 0; index < lists.length; index++) {
    let list = lists[index];

    while (list !== null) {
      const node = new ListNode(list.val);
      heap.push(node);
      siftUp(heap, node, heap.length - 1);
      list = list.next;
    }
  }
}

function peek() {
  let node = heap[0];
  return node;
}

function pop() {
  const node = peek();

  if (node !== null) {
    const lastNode = heap.pop();

    if (lastNode !== node) {
      heap[0] = lastNode;
      siftDown(heap, lastNode, 0);
    }
  }

  return node;
}

function siftDown(heap, node, i) {
  let index = i;
  const length = heap.length - 1;
  let halfLength = heap.length >>> 1;

  while (index < halfLength) {
    const leftIndex = index * 2 + 1;
    const left = heap[leftIndex];

    const rightIndex = leftIndex + 1;
    const right = heap[rightIndex];

    if (compare(node, left)) {
      // node 比左子节点大，应该下浮
      if (rightIndex < length && compare(right, left)) {
        // 右子节点最小
        heap[rightIndex] = node;
        heap[index] = right;
        index = rightIndex;
      } else {
        heap[leftIndex] = node;
        heap[index] = left;
        index = leftIndex;
      }
    } else if (rightIndex < length && compare(node, right)) {
      // node 比右大
      heap[rightIndex] = node;
      heap[index] = right;
      index = rightIndex;
    } else {
      return;
    }
  }
}

function siftUp(heap, node, i) {
  let index = i;
  while (index > 0) {
    const parentIndex = (index - 1) >>> 1;
    const parent = heap[parentIndex];
    if (compare(parent, node)) {
      heap[parentIndex] = node;
      heap[index] = parent;
      index = parentIndex;
    } else {
      return;
    }
  }
}

function compare(a, b) {
  return a.val > b.val;
}

// @lc code=end
