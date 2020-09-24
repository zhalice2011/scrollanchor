function navMapScroll (active, dataArt) {
    var pageEqClass = {}
    var navEqClass = {}
    var pageList = []
    var navElems = this.querySelectorAll('[' + dataArt + ']')
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
            var offsetTop = elem.offsetTop
            var elemH = elem.offsetHeight
            if (offsetTop - scrollTop <= 0 && offsetTop + elemH - scrollTop > 0) {
                navEqClass[k].classList.add(active)
            } else {
                navEqClass[k].classList.remove(active);
            }
        }
    }, 50, 200)
    navElems.forEach(($elem) => {
        const className = $elem.getAttribute(dataArt)
        const elem = document.getElementById(className)
        pageList.push(elem)
        pageEqClass[className] = elem
        navEqClass[className] = $elem
    })

    window.addEventListener('scroll', fn)

    navElems.forEach(($elem) => {
        $elem.onclick = function () {
            var className = this.getAttribute(dataArt)
            window.scrollTo(0, pageEqClass[className].offsetTop)
        }
    })
    fn()
}