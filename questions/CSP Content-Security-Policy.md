# CSP

内容安全策略，是一个安全层

CSP 告诉浏览器通过定义一系列规则，指明页面中哪些资源是可用的，
不在指定范围的资源统统拒绝掉

添加 CSP 的防范

- 服务器在资源响应头添加 `Content-Security-Policy`
- HTML 中添加 `meta` 标签指定 `Content-Security-Policy`

一些主要注意的 key

| key         | 描述                     |
| ----------- | ------------------------ |
| img-src     | 指定图片合法来源         |
| script-src  | 指定脚本合法来源         |
| xxx-src     | 指定 xx 资源的合法来源   |
| default-src | 未指定资源的默认合法来源 |

一些常用的值

| value             | 描述                      |
| ----------------- | ------------------------- |
| 'self'            | 和页面同源                |
| script-src 'none' | 不加载任何脚本 即使是同域 |
| unsafe-inline     | 允许内联                  |
| unsafe-eval       | 允许 eval                 |
| URI               | 如 \*.example.com         |

- 相同指令重复多次则忽略后面的
- 设置多次不相同的指令，严格的那个会生效

可以通过 report-uri 对检测到的问题进行上报
`Content-Security-Policy-Report-Only: img-src ‘none’; report-uri http://reportcollector.example.com/collector.cgi`

# 推荐的做法

- 先只开启报告模式，查看影响范围，逐步调整，从 default-src 'none'开始一直到满足需求
- 上线后观察一段时间如果没问题的话再由报告模式转为 CSP
