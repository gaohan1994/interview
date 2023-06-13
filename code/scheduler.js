
{
  // 题目1 编写 Scheduler

  // const timeout = (time) => new Promise(resolve => {
  //   setTimeout(resolve, time)
  // })
  
  // const scheduler = new Scheduler()
  // const addTask = (time, order) => {
  //   scheduler.add(() => timeout(time))
  //     .then(() => console.log(order))
  // }
  
  // 限制同一时刻只能执行2个task
  // addTask(4000, '1')
  // addTask(3500, '2')
  // addTask(4000, '3')
  // addTask(3000, '4')
  // .....
  
  //Scheduler ？
  //4秒后打印1
  //3.5秒打印2
  //3进入队列，到7.5秒打印3 
  //...
 

  class Scheduler {
    static MaxParallelJobNumber = 2;

    jobId = 0;

    workingJobs = [];

    hangUpJobs = [];

    get hasHangUpJobs () {
      return this.hangUpJobs.length > 0
    }

    /**
     * 添加任务调度
     * 如果当前执行的任务数量大于最大限制则加入到待办任务
     * 如果当前执行的任务数量小于最大限制则加入到正在执行任务，并执行
     * @param {*} fn 
     * @returns 
     */
    add = (fn) => {
      return new Promise((resolve) => {
        const job = {
          fn,
          id: this.jobId++,
          resolve
        } 

        if (this.workingJobs.length < Scheduler.MaxParallelJobNumber) {
          this.executeJob(job);
        } else {
          this.addHangUpJob(job);
        }
      })
    }

    /**
     * 执行任务
     * 执行之后从正在执行任务中删除该任务
     * 判断代办任务是否非空
     * 如果还有代办任务则取出待办任务执行
     * @param {*} job 
     */
    executeJob = (job) => {
      this.workingJobs.push(job);

      const {id, fn, resolve} = job;

      const splitJob = () => {
        const currentJobIndex = this.workingJobs.findIndex(job => job.id === id)
        this.workingJobs.splice(currentJobIndex, 1);
      }

      Promise.resolve(fn()).then(() => {
        splitJob();
        resolve();

        if (this.workingJobs.length < Scheduler.MaxParallelJobNumber && this.hasHangUpJobs) {
          this.executeJob(this.getFristHangUpJob());
        }
      })
    }

    addHangUpJob = (job) => {
      this.hangUpJobs.push(job);
    }

    getFristHangUpJob =() => {
      return this.hangUpJobs.shift();
    }
  }

  const timeout = (time) => new Promise(resolve => {
    setTimeout(resolve, time)
  })

  const scheduler = new Scheduler()

  const addTask = (time, order) => {
    scheduler
      .add(() => timeout(time))
      .then(() => console.log(order))
  }

  addTask(4000, '1')
  addTask(3500, '2')
  addTask(4000, '3')
  addTask(3000, '4')
  addTask(3000, '4')
  addTask(3000, '4')
  addTask(3000, '4')
} 