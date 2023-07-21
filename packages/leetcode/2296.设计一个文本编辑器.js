/*
 * @lc app=leetcode.cn id=2296 lang=javascript
 *
 * [2296] 设计一个文本编辑器
 */

// @lc code=start

const MAX_CURSOR_MOVE_RETURN_STRING_LENGTH = 10;

class TextEditor {
  value = "";

  cursor = 0;

  /**
   *
   * void
   * @author Harper.Gao
   * @memberof TextEditor
   */
  addText = text => {
    const preText = this.value.slice(0, this.cursor);
    const lastText = this.value.slice(this.cursor, this.value.length);
    this.value = preText + text + lastText;
    this.cursor += text.length;

    return void 0;
  };

  /**
   * @param {number} k
   * @return {number}
   */
  deleteText = deleteNumber => {
    // console.log("deleteText start");
    const cursorLeftValue = this.value.slice(0, this.cursor);
    // console.log("cursorLeftValue", cursorLeftValue);

    const realDeleteValueNumber = Math.min(deleteNumber, cursorLeftValue.length);

    if (realDeleteValueNumber < deleteNumber) {
      this.value = this.value.slice(this.cursor);
      this.cursor = 0;
    } else {
      const leftCursorValue = cursorLeftValue.slice(0, this.cursor - realDeleteValueNumber);
      const rightCursorValue = this.value.slice(this.cursor);
      this.value = leftCursorValue + rightCursorValue;
      this.cursor -= realDeleteValueNumber;
    }

    // console.log("realDeleteValueNumber", realDeleteValueNumber);
    // console.log("this.value", this.value);
    // console.log("this.cursor", this.cursor);
    // console.log("deleteText end");

    return realDeleteValueNumber;
  };

  /**
   * @param {number} k
   * @return {string}
   */
  cursorLeft = k => {
    if (this.cursor > k) {
      this.cursor -= k;
    } else {
      this.cursor = 0;
    }

    const leftValue = this.value.slice(0, this.cursor);

    if (leftValue.length < MAX_CURSOR_MOVE_RETURN_STRING_LENGTH) {
      return leftValue;
    }

    return leftValue.slice(-10);
  };

  /**
   * @param {number} k
   * @return {string}
   */
  cursorRight = k => {
    if (this.cursor + k >= this.value.length) {
      this.cursor = this.value.length;
    } else {
      this.cursor += k;
    }

    const leftValue = this.value.slice(0, this.cursor);

    if (leftValue.length < MAX_CURSOR_MOVE_RETURN_STRING_LENGTH) {
      return leftValue;
    }

    return leftValue.slice(-10);
  };
}

/**
 * Your TextEditor object will be instantiated and called as such:
 * var obj = new TextEditor()
 * obj.addText(text)
 * var param_2 = obj.deleteText(k)
 * var param_3 = obj.cursorLeft(k)
 * var param_4 = obj.cursorRight(k)
 */
// @lc code=end
