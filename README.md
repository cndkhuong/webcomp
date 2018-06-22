# webcomp
Web component demo

Using : just run index.html on **Chrome** :D 

Web Component : web component still development to become standard of reuse of web.

*Define web component

Web component defined by customElements from browser : 
```javascript
window.customElements.define('task-todo',
class Task extends HTMLElement {
    ...
}
```

*Using web component
Main point of web component is shadowDOM which keep web component was not effected by outside css & javascript. ShadowDOM render separately from the main document DOM and apply to DOM

```javascript
var shadow = this.attachShadow({mode:"open"});
```
We can template web component using tag or javascript throw customElements
```html
    <div is="task-todo"></div>
```
```javascript
let Drawer = customElements.get('task-todo');
let drawer = new Drawer();
```

*Content of component
Web component can define stylesheet & content using template tag or javascript inside 
```html
<template id="productrow">
  <style>
      .todo-task {
          background: white;
      }
  </style>
  <tr>
    <td class="record"></td>
    <td></td>
  </tr>
</template>
```
```javascript
var style = document.createElement("style");
style.textContent = ".todo-task { background: white; } "
var div = document.createElement("div");
...
shadow.appendChild(style);
shadow.appendChild(div);
```