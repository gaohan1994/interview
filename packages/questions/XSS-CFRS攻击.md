07-04

https://juejin.cn/post/6844903685122703367#heading-20
https://xss-game.appspot.com/

# XSS

跨站脚本注入

注入恶意代码攻击

常见的攻击形式

# 存储型

如论坛发帖，回复等

攻击者将带有攻击的代码存储到数据库中，
用户打开网页并从数据库获取数据拼接至 html 返回给浏览器
浏览器执行，混在其中的恶意代码也被执行了

# 反射性

构造出特殊的 URL，其中包含恶意代码

# dom 型

# 预防攻击

尽量避免输入过滤

- 纯前端渲染，数据和代码分离

  尽量避免使用一些 api 如 `.innerHTML` `react dangerouslySetInnerHTML`

  在事件内部杜绝使用 `eval()、setTimeout()、setInterval()` 时传入字符串

- 对 HTML 进行转义

- Content Security Policy
  ?

- 控制输入内容的长度

- HTTP-only Cookie
  禁止 JavaScript 读取某些敏感 Cookie，攻击者完成 XSS 注入后也无法窃取此 Cookie。

- 验证码
  防止脚本冒充用户提交危险操作。

# CSRF

https://juejin.cn/post/6844903689702866952#heading-3
https://owasp.org/www-community/attacks/csrf

跨站请求伪造，冒用用户信息，绕过后台验证
CSRF 一般是在第三方发起攻击，所以我们只能加强自身对 CSRF 的防御

防护策略

- 判断请求来源
  通过 origin 和 referer 来校验来源
  当请求没有携带 origin 或者 referer 时，可以选择直接毙掉

  注意一点，可以放到对 HTML 访问的 Get 请求（考虑搜索引擎的场景）

- CSRF Token  
  后端生成 Token 并存放在非 cookie 的地方
  每次提交请求的时候，可以在自己项目中通过封装拦截请求的技术对可能发出的所有请求都带上 token

- samesite cookie
  只对同源同协议的请求带上 cookie

  比如 a.com 设置

  ```javascript
  Set-Cookie: value1=1 samesite=Strict
  Set-Cookie: value2=1 samesite=Low
  Set-Cookie: value3=1
  ```

  意味着 topic.a.com 请求 a.com 并不会带上 cookie

- 防止网站被利用
  对用户上传的图片等，进行转存
  当用户打开其他用户填写的链接时，进行风险告知
