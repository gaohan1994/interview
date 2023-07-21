# 宏任务和微任务

https://juejin.cn/post/6844903764202094606

eg:

<script>
  console.log('script start')

  async function async1() {
    await async2()
    console.log('async1 end')
  }
  async function async2() {
    console.log('async2 end') 
  }
  async1()

  setTimeout(function() {
    console.log('setTimeout')
  }, 0)

  new Promise(resolve => {
    console.log('Promise')
    resolve()
  })
    .then(function() {
      console.log('promise1')
    })
    .then(function() {
      console.log('promise2')
    })

  console.log('script end')

  /** 
   * script start
   * async2 end
   * Promise
   * script end
   * async1 end
   * promise1
   * promise2
   * settimeout
   * 
   */
</script>


<script>
  async function async1() {
    console.log('async1 start')
    await new Promise(resolve => {
      console.log('promise1')
    })
    console.log('async1 success')
    return 'async1 end'
  }
  console.log('srcipt start')
  async1().then(res => console.log(res))
  console.log('srcipt end')
  

  /**
   * script start
   * async1 start
   * promise1
   * script end
   */
</script>