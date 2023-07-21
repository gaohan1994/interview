function _extends(A, B) {}

function myInstanceOf(A, B) {
  let proto = A._proto_;
  let prototype = B.prototype;

  while (proto !== null) {
    if (proto === prototype) {
      return true;
    }

    proto = proto._proto_;
  }

  return false;
}
