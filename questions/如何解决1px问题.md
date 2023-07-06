1px 问题原因

1css 像素不等于 1 物理像素
所以有的机型上 1px 可能会粗

方案 1
切一个 1px 的图然后使用 bacground-image 或者 image

方案 2
利用伪类和缩放

```css
::after {
  height: 1px;
  transform: scale(0.5);
}
```

方案 3
box-shadow

```css
.border_bottom {
  box-shadow: inset 0px -1px 1px -1px;
}
```
