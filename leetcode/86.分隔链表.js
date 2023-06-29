/*
 * @lc app=leetcode.cn id=86 lang=javascript
 *
 * [86] 分隔链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  let dummyMin = new ListNode(-1),
    dummyMax = new ListNode(-1),
    nodeMin = dummyMin,
    nodeMax = dummyMax;

  while (head !== null) {
    if (head.val < x) {
      nodeMin.next = head;
      nodeMin = nodeMin.next;
    } else {
      nodeMax.next = head;
      nodeMax = nodeMax.next;
    }

    let temp = head.next;
    head.next = null;
    head = temp;
  }

  nodeMin.next = dummyMax.next;
  return dummyMin.next;
};
// @lc code=end
