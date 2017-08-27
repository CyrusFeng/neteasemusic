$(function () {
    $.get("/songs.json").then(function (response) {

        response.forEach(function (i) {
            let $li = $(`
            <li>
                <a href="song.html?id=${i.id}">
                    <h3>${i.name}</h3>
                    <p>
                        <svg class="sq" aria-hidden="true">
                            <use xlink:href="#icon-sq"></use>
                        </svg>
                        Taylor Swift - Look What You Made Me Do
                    </p>
                
                    <svg class="play" aria-hidden="true">
                        <use xlink:href="#icon-play"></use>
                    </svg>
                </a>        
            </li>
            `);
            $('.latestmusic ol').append($li);
        }, this);
        $('.loadinggif').remove();
    })

    var $indexNav = $('.indexNav');
    var $tablist = $('.show>li');
    var $songlist;

    $indexNav.on('click', '.tab li', function (e) {
        var $li = $(e.currentTarget).addClass('active');
        $li.siblings().removeClass('active');
        var index = $li.index();

        $li.trigger('tabchange', index);
        $tablist.eq(index).addClass('actived').siblings().removeClass('actived');
    })

    $indexNav.on('tabchange', function (e, index) {
        if ($tablist.eq(index).attr('data-downloaded') === 'yes') {
            return;
        }
        if (index === 1) {
            $.get("/songs.json").then(function (response) {
                response.forEach(function (item,i) {
                    let $li = $(`
            <li>
            <a href="song.html?id=${item.id}">
                <div class="number">${i+1}</div>
                <div>
                    <h3>${item.name}</h3>
                    <p>
                        <svg class="sq" aria-hidden="true">
                            <use xlink:href="#icon-sq"></use>
                        </svg>
                        Taylor Swift - Look What You Made Me Do
                    </p>
                
                    <svg class="play" aria-hidden="true">
                        <use xlink:href="#icon-play"></use>
                    </svg>
                </div>
                
                    
                </a>        
            </li>
            `);
                    $('.hotmusic ol').append($li);
                //     $songlist = $('.hotmusic ol li');
                //  $('.hotmusic ol li .number').text($songlist.eq(i));
                }, this);
                $('.loadinggif').remove();

                 $tablist.eq(index).attr('data-downloaded','yes');
                 
            })
        } else if(index === 1){

        }
    })
})