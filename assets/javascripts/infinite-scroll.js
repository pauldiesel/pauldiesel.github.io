var woo = document.getElementById('articleslist').innerHTML;
var lock = false;
parser = new DOMParser();
var current = 1;
const setscrollcontent = function() {
    var articleslistDOM = $('#articleslist');
    var paginateDOM = document.getElementById('paginate');
    var pageUrl =
        current == 0 ? '/blog' : ('/blog/pages/' + (current + 1).toString());
    $.ajax({
        url: siteUrl + pageUrl + '/index.html',
        method: 'GET',
        dataType: 'html',
        success: function(response, status, xhr) {
            setTimeout(() => {
                articleslistDOM.append(response);
                current++;
                paginateDOM.innerHTML += '<a href="#page' + current.toString() +
                    '"> ' + current.toString() + '</a>';
                lock = false;
            }, 2000);
        },
        error: function(err, status, xhr) {
            lock = false;
        }
    });
    return true;
};

const runOnScroll = function() {
    return function() {
        if (lock) return true;
        if (current + 1 > maxPages) {
            document.getElementById('loadspinner').innerHTML =
                '<div style=\'text-align:center;\'><h1>Fear Not</h1><h2>The End, It is.</h2></div>';
            return true;
        }
        var wook = (window.pageYOffset -
                    document.getElementById('articleslist').scrollHeight) /
            window.pageYOffset;
        if (wook > -0.2 && wook < 0.2) {
            lock = true;
            setscrollcontent();
        }
    };
};

$(window).scroll(runOnScroll());
