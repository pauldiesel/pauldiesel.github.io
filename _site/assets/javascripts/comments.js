$(document).ready(function() {
    $('#show-comments').on('click', function(){
        load_disqus();
        load_facebook();
        $('#show-comments').hide();
        $('#comments-spinner').show();
        setTimeout(function(){
            $('#comments-spinner').hide();
            $('#comments').show();
        }, 5000);        
    });
});