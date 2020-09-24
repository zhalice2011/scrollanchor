var $ = document.querySelectorAll.bind(document);

function navMapScroll (active, dataArt) {
    var pageEqClass = {}
    var navEqClass = {}
    var pageList = []
    var navElems = $(this).find('[' + dataArt + ']')
    var thrFn = function (fn, time, maxLog) {
        var timeK = null
        var oTime = new Date().getTime()
        var execFn = function () {
            fn()
            oTime = new Date().getTime()
        }
        return function () {
            var nTime = new Date().getTime()
            clearTimeout(timeK)
            if (nTime - oTime > maxLog) {
                execFn()
            } else {
                timeK = setTimeout(execFn, time)
            }
        }
    }
    var fn = thrFn(function () {
        let scrollTop = window.pageYOffset || window.document.documentElement.scrollTop
        for (var k in pageEqClass) {
            var elem = pageEqClass[k]
            var offsetTop = elem.offset().top
            var elemH = elem.outerHeight()
            if (offsetTop - scrollTop <= 0 && offsetTop + elemH - scrollTop > 0) {
                navEqClass[k].addClass(active)
            } else {
                navEqClass[k].removeClass(active)
            }
        }
    }, 50, 200)
    navElems.each(function () {
        const $elem = $(this)
        const className = $elem.attr(dataArt)
        const elem = $('#' + className)
        pageList.push(elem)
        pageEqClass[className] = elem
        navEqClass[className] = $elem
    })
    $(window).on('scroll', fn)
    navElems.on('click', function () {
        var className = $(this).attr(dataArt)
        $(window).scrollTop(pageEqClass[className].offset().top)
    })
    fn()
}