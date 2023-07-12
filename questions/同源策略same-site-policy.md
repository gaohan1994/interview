https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy

## 同源策略

同源策略是一个安全策略，限制一个源的资源与另一个源的资源进行交互
可以帮助阻挡恶意脚本

比较 http://store.company.com/dir/page.html 同源和非同源

- 协议、主机、端口

| 地址                                            | 是否同源 | 原因         |
| ----------------------------------------------- | -------- | ------------ |
| http://store.company.com/dir2/other.html        | 同源     | 只有地址不同 |
| http://store.company.com/dir/inner/another.html | 同源     | 只有地址不同 |
| https://store.company.com/secure.html           | 不同源   | 协议不同     |
| http://store.company.com:81/dir/etc.html        | 不同源   | 端口不同     |
| http://news.company.com/dir/other.html          | 不同源   | 主机不同     |

一些常见的可能嵌入跨域资源的方式

- <img/>
- <video/>
- <iframe/>
