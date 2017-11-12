var Timer = function () {
    var timer;

    var __lastInterval;
    var __func;

    this.start = function (interval, func) {
        __lastInterval = interval;
        __func = func;

        timer = setInterval(func, interval)
    }

    this.restart = function () {
        this.stop();
        this.start(__lastInterval, __func);
    }

    this.stop = function () {
        clearInterval(timer);
    }
};

function makePages() {
    var el = $(".gallery-imgs ul.pagination");
    for (var i = 0; i < el.length; i++) {
        var current = $(el[i]);
        var count = current.attr("d-count");
        for (var j = 0; j < count; j++) {
            current.append("<li><a href='#'>" + (j + 1) + "</a>")
        }
    }

    el.find("li:eq(0)").addClass("active");
}

$(function () {
    var timer = new Timer();
    makePages();

    $(window).scroll(function () {
        var scroll = $(this).scrollTop();
        var wh = $(window).height();

        $(".scroll-target").each(function (i, v) {
            var id = $(this).attr("id");
            var block = $(this).offset().top - 50 - wh * 0.20;

            if (scroll > block) {
                $("#main-menu .active").removeClass("active");
                $("#main-menu .menu-contents a[href='#" + id + "']").parent().addClass("active");
            }
        });
    });

    $(window).scroll();

    timer.start(2000, function () {
        var el = $("#gallery-block .gallery-imgs:visible");
        el.find("ul.pagination .active").removeClass("active");

        var visibleImg = el.children("img:visible");
        var nextImg = visibleImg.next("img");
        if (nextImg.length == 0) {
            nextImg = el.children("img:eq(0)");
        }

        visibleImg.hide();
        nextImg.show();

        var paginationLink = el.find("ul.pagination li:eq(" + nextImg.index() + ")");
        paginationLink.addClass("active");
    });

    $("#main-menu a").click(function (e) {
        var self = $(this);
        if (self.attr("href")[0] != "#") return;

        e.preventDefault();
        var target = $(self.attr("href"));

        if (!self.parent("li").hasClass("active")) {
            $("html, body").animate({ scrollTop: target.offset().top - 50 }, 1000);
        }
    });

    $("h1").scroll(function (e) {
        var el = $(e.currentTarget);
        if (el[0].scrollHeight - el.scrollTop() == el.outerHeight()) {
            console.log("bottom");
        }
    });

    $("#courses a").click(function (e) {
        e.preventDefault();
        $(".course-desc-box:visible").hide();

        var target = $(this).attr("href");
        var targetEl = $(target);

        targetEl.show();
    });

    $(".gallery-menu a").click(function (e) {
        e.preventDefault();

        var self = $(this);
        var target = $(self.attr("href"));

        $(".gallery-menu a.active").removeClass("active");
        self.addClass("active");

        $(".gallery-imgs:visible").hide();
        target.show();

        timer.restart();
    });

    $(".gallery-imgs a").click(function (e) {
        e.preventDefault();

        var self = $(this).parent();
        var index = self.index();

        var gallery = self.closest(".gallery-imgs");

        gallery.find("ul.pagination .active").removeClass("active");
        self.addClass("active");

        gallery.children("img:visible").hide();
        gallery.children("img:eq(" + index + ")").show();

        timer.restart();
    });
});