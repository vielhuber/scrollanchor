# ⚓ scrollanchor ⚓

scrollanchor handles (cross-page) anchor scroll links including active states.

## installation

copy the dependency free [script.js](https://github.com/vielhuber/scrollanchor/blob/master/script.js) and adjust it to your needs.

## development

Use Node.js LTS (`nvm use`) and install dependencies with `npm install`.
Run `npm run prod` to build `dist/script.min.js`, or `npm run dev` to rebuild it when the source changes.
Open `page1.html` or `page2.html` through your local web server to test the demo.

The build uses Vite, following the JavaScript setup in boilerplate, and targets modern browsers rather than ES5.

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
