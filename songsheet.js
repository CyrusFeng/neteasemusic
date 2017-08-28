$(function () {
    $.get("/songsheet.json").then(function (response) {
        response.forEach(function (item, i) {
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
            $('.list ol').append($li);
        }, this);
        // $('.loadinggif').remove();
    })
    var $introtext = $('main .intro .intro_text');
    var $toggle = $('main .intro .intro_text .toggle');
    var $down = $('main .intro .intro_text .toggle .icondown');
    var $up = $('main .intro .intro_text .toggle .iconup');
    
    var $upnode = $(`
                <svg class="iconup" aria-hidden="true">
                      <use xlink:href="#icon-packup"></use>
                </svg>
            `);
    var $downnode = $(`
                <svg class="icondown" aria-hidden="true">
                      <use xlink:href="#icon-unfold"></use>
                </svg>
            `);
    $toggle.on('click',function() {
        if ($down.css('display') !== 'none') {
            $introtext.css('display', 'block').css('height', 'inherit');
            $down.css('display','none');
            $up.css('display','block');
            return;
        }
        if($up.css('display') !== 'none'){
            $introtext.css('display', '-webkit-box').css('height', '57px');
            $up.css('display','none');
            $down.css('display','block');
            return;
        }
    })
    
})