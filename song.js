$(function () {

    var audio = document.createElement('audio');
    var $pause = $('.icon-pause');
    var $play = $('.icon-play');
    var $light = $('.disc-container .disc .light');
    var $cover = $('.disc-container .disc .cover');
    
  
    $play.css('display','block');

    $pause.on('click',function() {
        audio.pause();
        $pause.css('display','none');
        $play.css('display','block');
        $light.addClass('stop');
        $cover.addClass('stop');
    })
    $play.on('click',function() {
        audio.play();
        $('.disc').addClass('active');

        $play.css('display','none');
        $pause.css('display','block');
        $light.removeClass('stop');
        $cover.removeClass('stop');
    })
    let id = location.search.match(/\bid=([^&])*/)[1];
    var $title = $('.description .title');
    $.get('songs.json').then(function(response) {
        response.forEach(function(item) {
            if (id == item.id) {   
                audio.src = item.url;
                $title.text(item.name);
            }
        }, this);
    })

    

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

    
})