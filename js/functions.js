var $window = $(window), 
    gardenCtx, 
    gardenCanvas, 
    $garden, 
    garden;

var clientWidth = $(window).width();
var clientHeight = $(window).height();

$(function () {
    $loveHeart = $("#loveHeart");
    var a = $loveHeart.width() / 2;
    var b = $loveHeart.height() / 2 - 55;

    $garden = $("#garden");
    gardenCanvas = $garden[0];
    gardenCanvas.width = $("#loveHeart").width();
    gardenCanvas.height = $("#loveHeart").height();

    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";

    garden = new Garden(gardenCtx, gardenCanvas);

    $("#content").css("width", $loveHeart.width() + $("#code").width());
    $("#content").css("height", Math.max($loveHeart.height(), $("#code").height()));
    $("#content").css("margin-top", Math.max(($window.height() - $("#content").height()) / 2, 10));
    $("#content").css("margin-left", Math.max(($window.width() - $("#content").width()) / 2, 10));

    setInterval(function () {
        garden.render();
    }, Garden.options.growSpeed);
});

$(window).resize(function () {
    var b = $(window).width();
    var a = $(window).height();
    if (b != clientWidth && a != clientHeight) {
        location.replace(location);
    }
});

function getHeartPoint(c) {
    var b = c / Math.PI;
    var a = 19.5 * (16 * Math.pow(Math.sin(b), 3));
    var d = -20 * (
        13 * Math.cos(b) -
        5 * Math.cos(2 * b) -
        2 * Math.cos(3 * b) -
        Math.cos(4 * b)
    );
    return new Array(offsetX + a, offsetY + d);
}

function startHeartAnimation() {
    var c = 50;
    var d = 10;
    var b = new Array();

    var a = setInterval(function () {
        var h = getHeartPoint(d);
        var e = true;

        for (var f = 0; f < b.length; f++) {
            var g = b[f];
            var j = Math.sqrt(Math.pow(g[0] - h[0], 2) + Math.pow(g[1] - h[1], 2));
            if (j < Garden.options.bloomRadius.max * 1.3) {
                e = false;
                break;
            }
        }

        if (e) {
            b.push(h);
            garden.createRandomBloom(h[0], h[1]);
        }

        if (d >= 30) {
            clearInterval(a);
            showMessages();
        } else {
            d += 0.2;
        }
    }, c);
}

// jQuery typewriter plugin
(function (a) {
    a.fn.typewriter = function () {
        $('#clickthis').hide()
         var totalElements = this.length;

        this.each(function (index) {
            var d = a(this),
                c = d.html(),
                b = 0;

            d.html("");

            var e = setInterval(function () {
                var f = c.substr(b, 1);

                if (f == "<") {
                    b = c.indexOf(">", b) + 1;
                } else {
                    b++;
                }

                d.html(c.substring(0, b) + (b & 1 ? "_" : ""));

                if (b >= c.length) {
                    clearInterval(e);

                    // Check if this is the last element
                    if (index === totalElements - 1) {
                        $('#clickthis').fadeIn(2000);
                    }
                }

                
            }, 75);
        });

        return this;
    };
})(jQuery);

function timeElapse(startDate) {
    var now = new Date();
    var seconds = Math.floor((now - Date.parse(startDate)) / 1000);

    // Years (365 days for simplicity, ignoring leap years)
    var years = Math.floor(seconds / (3600 * 24 * 365));
    seconds %= (3600 * 24 * 365);

    // Days
    var days = Math.floor(seconds / (3600 * 24));
    seconds %= (3600 * 24);

    // Hours
    var hours = Math.floor(seconds / 3600);
    if (hours < 10) hours = "0" + hours;
    seconds %= 3600;

    // Minutes
    var minutes = Math.floor(seconds / 60);
    if (minutes < 10) minutes = "0" + minutes;
    seconds %= 60;

    // Seconds
    if (seconds < 10) seconds = "0" + seconds;

    // Display
    var result = '<span class="digit">' + years + '</span> 年 ' +
                 '<span class="digit">' + days + '</span> 天 ' +
                 '<span class="digit">' + hours + '</span> 小时 ' +
                 '<span class="digit">' + minutes + '</span> 分钟 ' +
                 '<span class="digit">' + seconds + '</span> 秒';

    $("#elapseClock").html(result);
}


function showMessages() {
    adjustWordsPosition();
    $("#messages").fadeIn(5000, function () {
        showLoveU();
    });
}

function adjustWordsPosition() {
    $("#words").css("position", "absolute");
    $("#words").css("top", $("#garden").position().top + 195);
    $("#words").css("left", $("#garden").position().left + 70);
}

function adjustCodePosition() {
    $("#code").css("margin-top", ($("#garden").height() - $("#code").height()) / 2);
}

function showLoveU() {
    $("#loveu").fadeIn(3000);
}
