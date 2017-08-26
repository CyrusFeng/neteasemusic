$(function () {


    var $pause = $('.icon-pause');
    var $play = $('.icon-play');
    var $light = $('.disc-container .disc .light');
    var $cover = $('.disc-container .disc .cover');
    var $container = $('.container');
    var $title = $('.description .title');
    var $lines = $('.lines');
    // $lines.css('transform',`translateY(${$('.lyric').height()/3}px)`);

    let id = location.search.match(/\bid=([^&])*/)[1];



    $.get('songs.json').then(function (response) {

        let arr = [];

        response.forEach(function (item) {
            if (id == item.id) {
                let {
                    url,
                    name,
                    imgurl,
                    imgbgurl
                } = item;

                initPlayer(url);

                $cover.attr('src', imgurl);
                $container.css('background-image', 'url(' + imgbgurl + ')');

                let lrc = item.ly.lrc.lyric; // 英文歌词
                initText(name, lrc);
            }
        }, this);
    })

    function initText(title, lyric) {
        $title.text(title);
        parseLyric(lyric);
    }


    /* 解析歌词 以回车符号为分割点 */
    function parseLyric(lyric) {

        arr = lyric.split('\n');
        let regex = /^\[(.+)\](.*)$/;
        arr = arr.map(function (string) {
            // let matchs = regex.exec(string); 有问题
            let matchs = string.match(regex);
            if (matchs) {
                return {
                    time: matchs[1],
                    words: matchs[2]
                }
            }
        })

        arr.map(function (row) {
            if (!row) {
                return;
            }
            let $lines = $(".description .lyric .lines");
            let $p = $("<p/>");
            // if (!row.time.match(regex2)) {
            //    return; 
            // }
            $p.attr('data-time', row.time).text(row.words);
            $p.appendTo($lines);
        })
    }

    function initPlayer(url) {
        var audio = document.createElement('audio');
        var id;

        audio.src = url;

        $play.css('display', 'block');

        $pause.on('click', function () {
            audio.pause();
            $pause.css('display', 'none');
            $play.css('display', 'block');
            $light.addClass('stop');
            $cover.addClass('stop');
            clearInterval(id);
        })
        $play.on('click', function () {
            audio.play();
            $('.disc').addClass('active');

            $play.css('display', 'none');
            $pause.css('display', 'block');
            $light.removeClass('stop');
            $cover.removeClass('stop');

            id = setInterval(function () {
                var seconds = audio.currentTime;
                var minutes = ~~(seconds / 60);
                var left = seconds - minutes * 60;
                var time = `${pad(minutes)}:${pad(left)}`;

                var $currrntLine;


                var $p = $('.lines p');
                for (var i = 0; i < $p.length; i++) {
                    var currrntLineTime = $p.eq(i).attr('data-time');
                    var nextLineTime = $p.eq(i + 1).attr('data-time');
                    if ($p.eq(i + 1).length !== 0 && time >= currrntLineTime && time < nextLineTime) {
                        $currrntLine = $p.eq(i);
                        break;
                    }
                }
                if ($currrntLine) {
                    $currrntLine.addClass('active').prev().removeClass('active');
                    var linesTop = $lines.offset().top;
                    var currTop = $currrntLine.offset().top;
                    var diff = currTop - linesTop - $('.lyric').height() / 3;
                    $lines.css('transform', `translateY(-${diff}px)`);
                }
            }, 1000)
        })


    }

    function pad(number) {
        return number >= 10 ? '' + number : '0' + number;
    }
    // $.get("/lyric.json").then(function (response) {
    //     let lrc = response.lrc.lyric; // 英文歌词
    //     let {
    //         tlyric
    //     } = response; // 中文歌词
    //     let arr = lrc.split('\n');
    //     let regex = /^\[(.+)\](.*)$/;
    //     arr = arr.map(function (string) {
    //         // let matchs = regex.exec(string); 有问题
    //         let matchs = string.match(regex);
    //         if (matchs) {
    //             return {
    //                 time: matchs[1],
    //                 words: matchs[2]
    //             }
    //         }

    //     })
    //     // let regex2 = /^[0-9]$/;
    //     arr.map(function (row) {
    //         if (!row) {
    //             return;
    //         }
    //         let $lines = $(".description .lyric .lines");
    //         let $p = $("<p/>");
    //         // if (!row.time.match(regex2)) {
    //         //    return; 
    //         // }
    //         $p.attr('data-time', row.time).text(row.words);
    //         $p.appendTo($lines);
    //     })
    // })


})