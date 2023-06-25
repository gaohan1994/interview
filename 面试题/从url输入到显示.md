# 从输入一个 URL 地址到浏览器完成渲染的整个过程

## url 解析

输入 url 回车，进行 url 解析

## DNS 解析

- DNS 解析过程
  根据优先级从高到底依次询问 url 的真实地址 => 根域名服务器，顶级域名服务器，权威域名服务器
  每级 DNS 服务器均有缓存，本地也有 DNS 缓存，同时 HOST 文件也有缓存

## 建立 TCP 链接

- 3 次握手 4 次挥手
  客户端处于 close 状态
  服务器处于 listen 状态

  客户端发送报文 [序列号 client_isn] syn 置为 1
  客户端处于 SYN_SENT 状态

  服务器端收到后返回报文 [序列号 client_isn + 1, 应答序列号 server_isn] syn 置为 1，ack 置为 1
  服务器端处于 SYNC_RECIVED 状态

  客户端收到报文返回 [确认应答号：server_isn + 1 ] ack 置为 1，同时这次报文可以携带数据
  客户端处于 ESTABLISHED 状态

  服务器收到报文
  服务器处于 ESTABLISHED 状态

- 重传、滑动窗口、流量控制、拥塞控制

## 发起 HTTP 请求

- 常见的状态码
- Http 缓存
  强制缓存 Cache-Control、Expired
  协商缓存 If-Not-Matched & ETag、If-Modified-Since & Last-Modify

- Http 1.1

  - 队头阻塞
    当顺序发送的请求系列中有一个请求因为某种原因被阻塞时，后面排队的所有请求也一同被阻塞了
  - 请求头没有压缩，报文体积较大
  - 请求只能从客户端发起，服务器端只能响应

- Https
  解决了 http 的安全问题，在 tcp 三次握手的前提上加入了 TLS/SSL 安全层
  TLS 的加密过程

  客户端发送 [client_ranom TLS_version, 加密套件] => 服务器端
  服务器端下发 [CA 证书, server_random, TLS_version, 选中的加密套件] => 客户端
  客户端校验 CA 证书，提取公钥 发送 [用公钥加密的 pre_master_key] => 服务器端
  服务器端拿到 公钥加密的 pre_master_key，用私钥解密，这时服务器端和客户端都有
  [client_random server_random pre_master_key] 利用公钥加密生成会话秘钥
  最后发送一次报文给客户端，把之前发生的所有数据都做个摘要下发供客户端校验。

- Http 2.0
  基于 https

  - 头部压缩：客户端和服务器端会共同维护一张信息表

  - 二进制格式
    头部信息帧，数据帧

  - 并发传输
    http2 引出了 stream 概念，在一条 tcp 连接中可以复用多路 stream 一个 stream 可以包含多个 message，每个 message 可能包含多个 Frame 也就是 http2 的帧，服务器接收到帧之后再根据 streamId 组装成有序的 http 消息
    不同的 stream 可以乱序发送，相同的 stream 只能有序发送

  - 服务器推送

  但是 http2 还是可能会有队头阻塞，TCP 层必须保证接受的数据是完整连续的，这样内核才会将缓冲区的数据返回给 http 应用层，当前一个数据没达到时，后面的数据就算达到了也只能存放在缓冲区

- Http3
  Http3 将传输层协议改成了 UDP
  UDP 的发送不管顺序，不会堵塞，基于 QUIC 协议可以实现类似 TCP 的可靠传输协议

  QUIC 特点 1、无队头阻塞 2、更快的建立连接 3、链接迁移

## 服务器接收到 http 返回资源浏览器接收到响应

## 解析 HTML 生成 dom，解析 CSS 生成 CSSOM，遇到 js 标签，暂停解析请求 js 文件并执行

## DOM + CSSOM 生成 render tree

遍历通过元素的属性计算出元素的空间信息以及显示信息（可触发回流）
调用浏览器的绘制方法（可触发重绘）
显示在屏幕上
关闭 TCP 连接

## 1、为什么进行 url 解析

因为 URL 规定只能使用 ASCII 字符集进行收发,所以要对 url 进行编码,同时还可以防止歧义 如 key1=value=2223
前端主流编码
encodeURI（82 个）：!#$&'()_+,/:;=?@-.\_~0-9a-zA-Z
encodeURIComponent（71 个）：!'()_-.\_~0-9a-zA-Z
区别是 encodeURI 的安全字符更多适合对整个 uri 进行编码
encodeURIComponent 适合对参数部分进行编码

## 2、DNS 解析过程

首先查看是否有 DNS 缓存
优先级：浏览器 DNS 缓存 -> 系统缓存 -> 路由器缓存 -> 根域服务器缓存 -> 顶级域名服务器缓存 -> 主域名服务器缓存
如果没有缓存则按照 根域名服务器->顶级域名服务器->主域名服务器 依次查找

### 怎么优化 DNS 解析？

1、CDN
使用 CDN 后，DNS 解析将域名解析权交给 CDN 的负载均衡来做，会根据用户的地址，网络以及服务器负载情况等因素找出一台最适合用户的服务器的 IP 地址返回

2、DNS 预解析 （不影响第一次 DNS 解析）
告诉浏览器对指定域名预解析

<mate http-equiv="x-dns-prefetch-control" content ="on" />
<link rel="dns-prefetch" href="//domain.com">

## 3、发起 TCP 链接的握手过程

客户端发送 {seq: n, SYN = 1} -> 服务器
服务器端接收到知道客户端想建立请求发送 {ack: n + 1, SYN = 1, seq: k} -> 客户端
客户端接收到报文校验应答码是否等于 n + 1 SYN 是否等于 1 再次发送一个 {ack: k + 1} -> 客户端
双方正式建立通信

### 为什么是 3 次 2 次行不行 4 次呢

2 次不行，假如客户端向服务器端发送报文，服务器过了一段时间还没回复，客户端再次发送请求，客户端回复并建立了通信完成了数据传输
但是上一次报文并没有丢失而是延时传到了服务器端，这个时候服务器端以为客户端又发起新请求，所以同意回复等待客户端传输，这样服务器
端就一直在等待客户端传递数据造成资源浪费

4 次也不合适，防君子不防小人，3 次已经做好了通信准备，再增加次数也不会显著提高可靠性，而且增加资源消耗 没必要

### 4 次挥手

1、客户端发送 {Fin = 1, seq = n} -> 服务器端 这时候客户端只能接受不能再发送了
2、服务器端接受到报文知道客户端要关闭了，发送 {ack = n + 1} -> 客户端
3、服务器端没有要发送的数据之后 发送 {fin = 1, seq = k} -> 客户端
4、客户端接收到 Fin = 1 且 seq = k 等待 2MSL 之后关闭 TCP 连接

为什么还要等待 2msl
1、为了防止报文丢失，因为一方发起结束请求，在结束之前还可以进行接收，如果这时候收到报文但是并没有给出回应
那么会继续发送这个报文直到回应，并且重新启动 2msl 计时
2、为了防止类似延时问题导致的报文延时到达问题，2MSL 可以保证本次链接时间内产生的报文在网络中消失

### TCP 滑动窗口

接收端根据目前可以处理的数据大小定下一个窗口大小，并在 TCP 报文里告知对方
发送端发送窗口内的数据并等待接收端的确认
接收端在这个窗口大小内的数据全部接受完毕并确认之后
重新划定下一个窗口大小一直循环到全部接受完毕

### 说说 TCP 的拥塞控制

拥塞窗口：Math.min(发送端窗口大小, 接收端窗口大小)
慢启动
三次握手之后接收方和发送方确定自己的窗口大小
发送端每接受到一个 ack，拥塞窗口大小 + 1 直到慢启动阈值，当窗口大小到达慢启动阈值的时候接受到一个 ack 窗口大小增加 1/拥塞窗口

### 快速重传 与 选择性重传

当接收端发现数据不是按照顺序到达的时候，接收端返回的 ack 是丢失段的的 ack
比如发送端发送 1，2，5 打到接收端，接收端一直返回第 2 个包的 ack，发送端发现一直受到 3 个重复的 ack 的时候就知道丢包了
这个时候重传

这时候重新发送第 3 个包，但是 5 之后的已经发送了，当然不用再发了，接收端会在报文头里设置 sack 设置已经接收到那些区间的数据就不用再次发送 5 之后的包了，这就叫选择性重传

## 4、讲讲 http 请求

### 讲讲 http 缓存

1、强制缓存
由 expires 或者 cache-control 指定 cache-control 优先级更高
格式 expires：过期时间 | cache-control：max-age=36000
服务器返回的资源报文头上如果指定了这两个属性，则浏览器会把资源缓存起来
下次请求时会查看是否超过过期时间，如果没有的话直接使用缓存资源，如果超过过期时间发送请求并再次缓存

2、协商缓存
两种 Etag/ if-None-match 和 last-modify / if-modify-since
服务器拿到资源后对资源的响应报文头上可以设置 Etag 和 last-modify 字段
last-modify 可以设定资源上次修改的时间、如果服务器获取的响应报文中带有 last-modify 字段则缓存这个资源
下次再发送请求的时候带上 if-modify-since 服务器判断对比请求头的日期和资源上次修改的日期是否匹配
如果匹配则返回 304，这时候客户端会使用缓存资源，如果不匹配则返回新的资源并设置新的过期字段
Etag 流程差不多

### http 格式

起始行 + 报文头 + 报文主体
说下你常用的 http 头字段

Accept： 数据格式 压缩方式 支持语言 字符集

### 常用状态码

200 请求成功
301 永久重定向
302 临时重定向
304 命中协商缓存
400 服务器接收到请求但拒绝执行
403 请求被服务器拒绝
404 服务器找不到请求资源
500 服务器内部发生了错误
502 服务器未响应

### 请求方法

GET POST HEAD DELETE PUT OPTIONS

GET 与 POST 的区别
1、GET 参数在 url 中，POST 参数在报文体中
2、GET 请求是明文的，并不安全，POST 请求是安全的
3、GET 请求会被浏览器主动缓存，POST 不会
4、GET 请求只能进行 url 编码 POST 可以多种编码

## 5、浏览器渲染解析页面

解析 HTML 生成 dom 树
解析 css 生成 cssom 树
dom 和 cssom 树合成 rendertree
浏览器渲染并绘制页面

其中解析 html 时，如果遇到 script 标签或者外联 js 资源会暂停解析请求 js 并执行（Async 和 defer）
[Aysnc 会异步加载加载完之后立即执行]
[defer 会异步加载等待 documentContentload 之后执行]

涉及到回流和重绘
回流：当 rendertree 中的元素的空间属性发生改变的时候浏览器会重新渲染这部分的过程叫回流

触发回流的操作：
首次渲染、js 操作 dom、请求 dom 的某些属性如 clintOffetTop、offsetHeight，scrollTo getcompultedStyle
浏览器窗口大小发生改变、伪类、元素内容变化

重绘：当 rendertree 中的元素的非空间属性发生了变化时浏览器重新绘制这部分元素的过程叫重绘

Event Loop

```javascript
// 1 7 6 8 2 4 3 5 9 11 10 12

console.log("1");

setTimeout(function () {
  console.log("2");
  process.nextTick(function () {
    console.log("3");
  });
  new Promise(function (resolve) {
    console.log("4");
    resolve();
  }).then(function () {
    console.log("5");
  });
});
process.nextTick(function () {
  console.log("6");
});
new Promise(function (resolve) {
  console.log("7");
  resolve();
}).then(function () {
  console.log("8");
});

setTimeout(function () {
  console.log("9");
  process.nextTick(function () {
    console.log("10");
  });
  new Promise(function (resolve) {
    console.log("11");
    resolve();
  }).then(function () {
    console.log("12");
  });
});
```
