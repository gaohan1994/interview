```html
<div class="parent">
  <div class="child"></div>
</div>
```

- flex

```css
.parent {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

- transform

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

```css
.parent {
  display: flex;
}
.child {
  margin: auto;
}
```
