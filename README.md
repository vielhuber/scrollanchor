# ⚓ scrollanchor ⚓

scrollanchor handles (cross-page) anchor scroll links including active states.

## installation

copy the dependency free [script.js](https://getcomposer.org/) and adjust it to your needs.

## usage

```js
import ScrollAnchor from './scrollanchor';
window.addEventListener('load', e => {
    new ScrollAnchor({
        scrollContainer: window,
        scrollOffset: '.navigation',
        targetAttribute: 'data-scrollanchor-target',
        activeClass: 'scrollanchor__link--active'
    });
});
```