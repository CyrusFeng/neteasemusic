$(function () {
    $.get("/songsheet.json").then(function (response) {
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
                    $('.list ol').append($li);
                }, this);
                // $('.loadinggif').remove();
            })
})