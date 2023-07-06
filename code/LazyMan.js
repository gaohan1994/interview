{
  //github.com/Advanced-Frontend/Daily-Interview-Question/issues/98
  // 要求设计 LazyMan 类，实现以下功能。

  // LazyMan("Tony");
  // Hi I am Tony

  // LazyMan("Tony").sleep(10).eat("lunch");
  // Hi I am Tony
  // 等待了10秒...
  // I am eating lunch

  // LazyMan("Tony").eat("lunch").sleep(10).eat("dinner");
  // Hi I am Tony
  // I am eating lunch
  // 等待了10秒...
  // I am eating diner

  // LazyMan("Tony").eat("lunch").eat("dinner").sleepFirst(5).sleep(10).eat("junk food");
  // Hi I am Tony
  // 等待了5秒...
  // I am eating lunch
  // I am eating dinner
  // 等待了10秒...
  // I am eating junk food

  https: function LazyMan(name) {
    class Man {
      quene = [];

      constructor(name) {
        this.name = name;
        console.log(`Hi I am ${this.name}`);
        Promise.resolve().then(() => this.next());
      }

      eat = food => {
        this.quene.push(() => {
          console.log(`I am eating ${food}`);
          this.next();
        });
        return this;
      };

      sleep = time => {
        this.quene.push(() => {
          new Promise(resolve => {
            setTimeout(() => resolve(this.next()), time * 1000);
          });
        });
        return this;
      };

      sleepFirst = time => {
        this.quene.unshift(() => {
          new Promise(resolve => {
            setTimeout(() => resolve(this.next()), time * 1000);
          });
        });
        return this;
      };

      next = () => {
        const task = this.quene.shift();
        task && task();
      };
    }

    return new Man(name);
  }

  // LazyMan("Tony1");
  // LazyMan("Tony2").sleep(3).eat("lunch");
  // LazyMan("Tony3").eat("lunch").sleep(3).eat("dinner");
  LazyMan("Tony4").eat("lunch").eat("dinner").sleepFirst(1).sleep(1).eat("junk food");
}
