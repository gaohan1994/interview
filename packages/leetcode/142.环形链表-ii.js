/*
 * @lc app=leetcode.cn id=142 lang=javascript
 *
 * [142] 环形链表 II
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  let p1 = head;
  let p2 = head;

  let hasCycle = false;

  while (p1 !== null && p1.next !== null) {
    p1 = p1.next.next;
    p2 = p2.next;

    if (p1 === p2) {
      hasCycle = true;
      break;
    }
  }

  if (!hasCycle) {
    return null;
  }

  p2 = head;

  while (p1 !== p2) {
    p1 = p1.next;
    p2 = p2.next;
  }

  return p1;
};

function hasCycle(head) {
  let p1 = head;
  let p2 = head;

  while (p1 !== null && p1.next !== null) {
    p1 = p1.next.next;
    p2 = p2.next;

    if (p1 === p2) {
      return true;
    }
  }

  return false;
}

// @lc code=end
