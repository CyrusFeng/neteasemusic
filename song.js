$(function () {
    $.get("/lyric.json").then(function (response) {
        let lrc = response.lrc.lyric; // 英文歌词
        let {
            tlyric
        } = response; // 中文歌词
        let arr = lrc.split('\n');
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
        // let regex2 = /^[0-9]$/;
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
    })

    var audio = document.createElement('audio');
    audio.src = 'http://dl.stream.qqmusic.qq.com/C4000026paSX1I8n5H.m4a?vkey=1698A2779F2B414B1254EA92E49BE06DEC3B9365C3B3000CC3B825DF93FB10ABA7575FB373BBF389C20C43DF5A501A99C5FDEB80994B3443&guid=6038429688&uin=0&fromtag=66';
    audio.oncanplay = function() {
        audio.play();
        $('.disc').addClass('active');
    }
})