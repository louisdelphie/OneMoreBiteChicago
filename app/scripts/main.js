'use strict';

// Dreamweaver rollover image functions
function MMSwapImgRestore() { //v3.0 not being used.
    var i, x, a = document.MMSr;
    for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++) {
        x.src = x.oSrc;
    }
}

function MMPreLoadImages() { //v3.0 not being used.
    var d = document;
    if (d.images) {
        if (!d.MMp) {
            d.MMp = new Array([]);
        }
        var i, j = d.MMp.length,
            a = MMPreLoadImages.arguments;
        for (i = 0; i < a.length; i++) {
            if (a[i].indexOf('#') !== 0) {
                d.MMp[j] = new Image();
                d.MMp[j++].src = a[i];
            }
        }
    }
}

function MMFindObj(n, d) { //v4.01
    var p, i, x;
    if (!d) {
        d = document;
    }
    if ((p = n.indexOf('?')) > 0 && parent.frames.length) {
        d = parent.frames[n.substring(p + 1)].document;
        n = n.substring(0, p);
    }
    if (!(x = d[n]) && d.all) {
        x = d.all[n];
    }
    for (i = 0; !x && i < d.forms.length; i++) {
        x = d.forms[i][n];
    }
    for (i = 0; !x && d.layers && i < d.layers.length; i++) {
        x = new MMFindObj(n, d.layers[i].document);
    }
    if (!x && d.getElementById) {
        x = d.getElementById(n);
    }
    return x;
}
// End of Dreamweaver Functions


/*========================================
=            CUSTOM FUNCTIONS            =
========================================*/
// Used only on small screens (phones, small tablets and etc.).
function toggleNav(event) {
    if ($('#site-wrapper').hasClass('show-nav')) {
        // Do things on Nav Close
        $('#site-wrapper').removeClass('show-nav');
    } else {
        // Do things on Nav Open
        $('#site-wrapper').addClass('show-nav');
        // overlay the page out the nav
        event.preventDefault();
        $('div.overlay').fadeToggle('slow');

    }
}

// used the change the text in bottom ribbon.
function changeTxt() {
    var txt = new Array('One', 'More', 'Bite'),
        str = $('div.txt').text(),
        indxOfstr = jQuery.inArray(str, txt);

    if (indxOfstr === (txt.length - 1)) {
        $('div.txt').text(txt[0]);
        indxOfstr = 0;
    } else {
        $('div.txt').text(txt[indxOfstr + 1]);
        indxOfstr++;
    }
}

// toggles on and off the font awesome caret right icon
function toggleFaCaretRightIcon($this) {
    var $fa = $this.prev('.fa'),
        icon = '<i class="fa fa-caret-right">&nbsp;&nbsp;</i>';
    if ($fa.length === 0) {
        // Remove all icons from page
        $('.fa-caret-right').remove();
        if ($('a').hasClass('cupcake-selected')) {
            $('a').removeClass('cupcake-selected');
        }
        // add icon to before this link
        $(icon).insertBefore($this);
        $this.addClass('cupcake-selected');
    }
}

// swap the images when name is clicked. Modified Dreamweaver Function
function swapImage($this) {
    var linkInfo = $this.data('options'),
        indx,
        j = 0,
        x,
        a = new Array('image', '', linkInfo.newsrc, 1);

    document.MMSr = new Array([]);

    for (indx = 0; indx < (a.length - 2); indx += 3) {
        if ((x = new MMFindObj(a[indx])) !== null) {
            document.MMSr[j++] = x;
            if (!x.oSrc) {
                x.oSrc = x.src;
            }
            x.src = a[indx + 2];
        }
    }

}

function toggleDropdown(title){
    //var title = $this.attr('title');

    if(title === 'One More Bite - Menu' && $(window).width() < 768)
    {
        $('.dropdown-menu').dropdown('toggle');
        toggleNav();
    }
}

/*====================================
=            ON DOM READY            =
====================================*/
$(function () {
    $('.toggle').click(function (event) {
        event.preventDefault();
        toggleNav();
    });

    toggleDropdown($(this).attr('title'));

});

/*====================================
=          ON WINDOW LOAD            =
====================================*/
$(window).load(function () {
    $('.swap_image').each(function () {
        $('a').click(function () {
            swapImage($(this));
            toggleFaCaretRightIcon($(this));
            changeTxt();
        });
    });
});
