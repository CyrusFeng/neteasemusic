$(function () {
    $.get("/songs.json").then(function (response) {
         
        response.forEach(function(i) {
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

})