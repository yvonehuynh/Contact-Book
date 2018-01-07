'use strict';

var script = {};

/* WOW Animationa */
var wowAnimate = function wowAnimate() {
    var wow = void 0;
    new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 100,
        mobile: false,
        live: true
    }).init();
};

/* Animate on Scroll */
function animateScroll() {
    (function ($) {

        /**
         * Copyright 2012, Digital Fusion
         * Licensed under the MIT license.
         * http://teamdf.com/jquery-plugins/license/
         *
         * @author Sam Sehnert
         * @desc A small plugin that checks whether elements are within
         *     the user visible viewport of a web browser.
         *     only accounts for vertical position, not horizontal.
         */

        $.fn.visible = function (partial) {

            var $t = $(this),
                $w = $(window),
                viewTop = $w.scrollTop(),
                viewBottom = viewTop + $w.height(),
                _top = $t.offset().top,
                _bottom = _top + $t.height(),
                compareTop = partial === true ? _bottom : _top,
                compareBottom = partial === true ? _top : _bottom;

            return compareBottom <= viewBottom && compareTop >= viewTop;
        };
    })(jQuery);

    var win = $(window);

    var allMods = $(".module");

    allMods.each(function (i, el) {
        var el = $(el);
        if (el.visible(true)) {
            el.addClass("already-visible");
        }
    });

    win.scroll(function (event) {

        allMods.each(function (i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass("come-in");
            }
        });
    });
}

/* Flickity */

function flickity() {
    $('.main-carousel').flickity({
        cellAlign: 'left',
        contain: true,
        imagesLoaded: true
    });
};

/* TypeWriter Effect */

var animateType = function animateType() {
    var TxtType = function TxtType(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 2) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function () {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) {
            delta /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    };

    window.onload = function () {
        var elements = document.getElementsByClassName('typewrite');
        for (var i = 0; i < elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 1rem solid #000}";
        document.body.appendChild(css);
    };
    //RERUN
};

function closeLink() {
    $('a[href^="#"]').on('click', function () {
        $('input[type="checkbox"]').prop('checked', false);
    });
}

script.init = function () {
    animateType();
    animateScroll();
    flickity();
    wowAnimate();
    closeLink();
    wowAnimate();
};

$(document).ready(function () {
    script.init();
});
