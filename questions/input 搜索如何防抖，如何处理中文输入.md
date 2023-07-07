07-06
https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/129

# 防抖

自行实现 debounce

# 中文输入

如果只设定了 onInput 事件
在输入中文时有可能还没有形成真正有用想要输出的汉字，但是却一直触发 input 事件

我们可以通过来以下原生事件来限制

- compositionstart
  事件触发于一段文字的输入之前（类似于 keydown 事件，但是该事件仅在若干可见字符的输入之前，而这些可见字符的输入可能需要一连串的键盘操作、语音识别或者点击输入法的备选词

- compositionupdate
- compositionend

中文输入法时在打拼音时(此时 input 内还没有填入真正的内容)，会首先触发 compositionstart，然后每打一个拼音字母，触发 compositionupdate，最后将输入好的中文填入 input 中时触发 compositionend
