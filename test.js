var s = 1;
console.log(s++);
console.log(++s);
console.log((s += 1));

for (let w = 0; w <= 5; w++) {
  console.log('w', w);
}

var func = (x = 1, y = 2) => {
  return x + y;
};

const a = func();
console.log('a', a);
