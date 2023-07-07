{
  // github.com/Advanced-Frontend/Daily-Interview-Question/issues/93

  // var a = {n: 1};
  // var b = a;
  // a.x = a = {n: 2};
  // console.log(a.x)
  // console.log(b.x)

  https: var a = { n: 1 };

  var b = a;

  // 这里重新给 a 分配内存
  // a = { n: 2 } b = { n: 1 }

  a = { n: 2 };

  // a.x 这时 a 指向的是最开始的 a
  // b = {n:1, x: {n:2}}
  // a = {n:2}
  a.x = a; // a = b = { n: 2, x: a }
}

{
  // example 1
  var a = {},
    b = "123",
    c = 123;
  a[b] = "b";
  a[c] = "c";
  console.log(a[b]);

  // example 2
  var a = {},
    b = Symbol("123"),
    c = Symbol("123");
  a[b] = "b";
  a[c] = "c";
  console.log(a[b]);

  // example 3
  var a = {},
    b = { key: "123" },
    c = { key: "456" };
  a[b] = "b";
  a[c] = "c";
  console.log(a[b]);
}

{
  function changeObjProperty(o) {
    o.siteUrl = "http://www.baidu.com";
    o = new Object();
    o.siteUrl = "http://www.google.com";
  }
  let webSite = new Object();
  changeObjProperty(webSite);
  console.log(webSite.siteUrl);
}

{
  function Foo() {
    Foo.a = function () {
      console.log(1);
    };
    this.a = function () {
      console.log(2);
    };
  }
  Foo.prototype.a = function () {
    console.log(3);
  };
  Foo.a = function () {
    console.log(4);
  };
  Foo.a(); // 4
  let obj = new Foo();
  obj.a(); // 2
  Foo.a(); // 1

  function myNew(cons, ...rest) {
    let result = {};
    result.__proto__ = cons.prototype;
    cons.call(result, ...rest);
  }
}
