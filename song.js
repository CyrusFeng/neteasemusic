$(function () {


    var $pause = $('.icon-pause');
    var $play = $('.icon-play');
    var $light = $('.disc-container .disc .light');
    var $cover = $('.disc-container .disc .cover');
    var $container = $('.container');
    var $title = $('.description .title');

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

        audio.src = url;

        $play.css('display', 'block');

        $pause.on('click', function () {
            audio.pause();
            $pause.css('display', 'none');
            $play.css('display', 'block');
            $light.addClass('stop');
            $cover.addClass('stop');
        })
        $play.on('click', function () {
            audio.play();
            $('.disc').addClass('active');

            $play.css('display', 'none');
            $pause.css('display', 'block');
            $light.removeClass('stop');
            $cover.removeClass('stop');
        })
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