# ⚓ scrollanchor ⚓

scrollanchor handles (cross-page) anchor scroll links including active states.

## installation

copy the dependency free [script.js](https://github.com/vielhuber/scrollanchor/blob/master/script.js) and adjust it to your needs.

## usage

```js
import ScrollAnchor from './scrollanchor';
window.addEventListener('load', e => {
    new ScrollAnchor({
        scrollContainer: null,
        scrollOffset: '.navigation',
        targetAttribute: 'data-scrollanchor-target',
        activeClass: 'scrollanchor__link--active'
    });
});
```
