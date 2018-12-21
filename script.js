import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

export default class ScrollAnchor {
    scrollContainer = null;
    scrollOffset = null;
    targetAttribute = null;
    activeClass = null;
    constructor(args = null) {
        this.setDefaultArgs(args);
        this.bindActiveStates();
        this.bindLinks();
        this.initialJump();
    }
    setDefaultArgs(args = null) {
        if (args !== null && typeof args === 'object') {
            if ('scrollOffset' in args) {
                this.scrollOffset = args.scrollOffset;
            }
            if ('scrollContainer' in args) {
                this.scrollContainer = args.scrollContainer;
            }
            if ('targetAttribute' in args) {
                this.targetAttribute = args.targetAttribute;
            }
            if ('activeClass' in args) {
                this.activeClass = args.activeClass;
            }
        }
    }
    bindActiveStates() {
        window.addEventListener('scroll', () => {
            if (document.querySelector('[' + this.targetAttribute + ']') !== null) {
                let done = false;
                document.querySelectorAll('[' + this.targetAttribute + ']').forEach(el => {
                    if (done === true) {
                        return;
                    }
                    let offset = this.offsetTop(el),
                        origin = document.querySelector(
                            '[href*="' + el.getAttribute(this.targetAttribute) + '"]'
                        );
                    if (
                        offset >= this.scrollTop() &&
                        offset <= this.scrollTop() + window.innerHeight &&
                        origin !== null
                    ) {
                        if (document.querySelector('.' + this.activeClass) !== null) {
                            document.querySelectorAll('.' + this.activeClass).forEach(el2 => {
                                if (origin !== el2) {
                                    el2.classList.remove(this.activeClass);
                                }
                            });
                        }
                        origin.classList.add(this.activeClass);
                        done = true;
                    }
                });
            }
        });
    }
    offsetTop(el) {
        return (
            el.getBoundingClientRect().top + window.pageYOffset - document.documentElement.clientTop
        );
    }
    scrollTop() {
        return (
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop
        );
    }
    bindLinks() {
        document.documentElement.addEventListener('click', e => {
            let el = e.target.closest('[href*="#"]');
            if (el) {
                let href = el.getAttribute('href');
                if (this.isLinkInternal(href)) {
                    let id = this.extractIdFromLink(href);
                    if (
                        document.querySelector('[' + this.targetAttribute + '="' + id + '"]') !==
                        null
                    ) {
                        this.scrollTo(id);
                        e.preventDefault();
                    } else {
                        // use local storage to save target (we do not want ugly hashes)
                        localStorage.setItem('initialJump', id);
                        el.setAttribute('href', href.substring(0, href.indexOf('#')));
                    }
                }
            }
        });
    }
    initialJump() {
        if (localStorage.getItem('initialJump') !== null) {
            requestAnimationFrame(() => {
                this.scrollTo(localStorage.getItem('initialJump'));
                localStorage.removeItem('initialJump');
            });
        } else if (window.location.hash) {
            let hash = window.location.hash.replace('#', '');
            this.removeHashFromUrl();
            this.scrollTo(hash);
        }
    }
    scrollTo(id) {
        let target = document.querySelector('[' + this.targetAttribute + '="' + id + '"]');
        if (target === null) {
            return;
        }
        let container = window,
            offset = 0;
        if (this.scrollContainer !== null && this.scrollContainer !== window) {
            container = document.querySelector(container);
            offset =
                container.getBoundingClientRect().top +
                window.pageYOffset -
                document.documentElement.clientTop;
        }
        if (this.scrollOffset !== null && document.querySelector(this.scrollOffset) !== null) {
            offset += document.querySelector(this.scrollOffset).offsetHeight;
        }
        let top =
            target.getBoundingClientRect().top +
            container.pageYOffset -
            document.documentElement.clientTop -
            offset;
        container.scroll({ top: top, left: 0, behavior: 'smooth' });
    }
    isLinkInternal(href) {
        if (href.indexOf(window.location.protocol + '//' + window.location.host) > -1) {
            return true;
        }
        if (href.indexOf('http') !== 0) {
            return true;
        }
        return false;
    }
    extractIdFromLink(href) {
        return href.substring(href.indexOf('#') + 1);
    }
    removeHashFromUrl() {
        if (history.pushState) {
            window.history.replaceState(
                {},
                '',
                window.location.protocol +
                    '//' +
                    window.location.hostname +
                    window.location.pathname
            );
        }
    }
}
window.addEventListener('load', e => {
    new ScrollAnchor({
        scrollContainer: window,
        scrollOffset: '.navigation',
        targetAttribute: 'data-scrollanchor-target',
        activeClass: 'scrollanchor__link--active'
    });
});
