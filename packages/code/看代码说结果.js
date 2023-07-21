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

{
  var name = "hello";
  var obj = {
    name: "hi",
    props: {
      name: "javascript",
      getName: function () {
        return this.name;
      },
    },
  };

  console.log(obj.props.getName());
  var test = obj.props.getName;
  console.log(test());

  // javascript 函数隐式绑定最多只能绑定一层，超过一层由类属性选择器接管，调用函数时，绑定到最近的 obj 上
  // hello 没有绑定this 默认绑定至 window

  function log() {
    console.log(a); // 相当于 var a = undefined; b 是函数会提升至作用域顶部
    console.log(b());
    var a = 1;

    function b() {
      return 2;
    }
  }

  function log() {
    function b() {
      return 2;
    }

    var a = undefined;
    console.log(a); // 相当于 var a = undefined; b 是函数会提升至作用域顶部
    console.log(b());
    var a = 1;
  }

  log();

  (function () {
    var a = (b = 5);
  })();
  console.log(b);

  // 假设页面上有6个按钮，点击第一个按钮和第四个按钮分别输出什么，为什么，如果要实现0,3要怎么修改
  var buttons = document.getElementsByTagName("button");
  for (var i = 0; i < 6; i++) {
    buttons[i].addEventListener("click", function () {
      console.log(i); // 均输出 6
    });
  }

  for (var i = 0; i < 6; i++) {
    (function (index) {
      buttons[index].addEventListener("click", function () {
        console.log(index);
      });
    })(i);
  }

  for (let i = 0; i < 6; i++) {
    buttons[i].addEventListener("click", function () {
      console.log(i); // 均输出 6
    });
  }
}

{
  onsole.log(typeof null);
  console.log(typeof {});
  console.log(typeof []);
  console.log(typeof undefined);

  // object
  // object
  // object
  // undefined
}

{
  console.log(1);
  setTimeout(function () {
    console.log(2);
  }, 1000);
  setTimeout(function () {
    console.log(3);
  }, 0);
  Promise.resolve().then(function () {
    console.log("4");
  });
  console.log(5);

  /**
   * 1 5 4 3 2
   */

  ["1", "0", "2", "4"].map(parseInt);

  ["1", "0", "2", "4"].map((item, radix) => parseInt(item, radix));
  // [1, NAN, NAN, NAN]
}

{
  // for of和for in的区别，forEach和map的区别
}
