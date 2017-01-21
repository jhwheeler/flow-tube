var YouTube_Base_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromAPI(searchTerm, callback) {
    var query = {
        part: 'snippet',
        q: searchTerm,
        key: "AIzaSyC2AE-iBqm6JpTYuLnnYnjNEvidnD9tW4o"
    }
    $.getJSON(YouTube_Base_URL, query, callback);
}

function displaySearchData(data) {
    var resultElement = '';
    if (data.items) {
        $.each(data.items, function() {
            console.log(data.items);
            var thumbnailURL = this.snippet.thumbnails.medium.url;
            var videoURL = 'https://youtube.com/watch?v=' + this.id.videoId;
            resultElement += '<a href="' + videoURL + '"><img src="' + thumbnailURL + '"></a>';
        });
    } else {
        resultElement += '<p>No results...</p>';
    }
    $('.js-search-results').html(resultElement);
}

function watchSubmit() {
    $('.js-search-form').submit(function(e) {
        e.preventDefault();
        var query = $(this).find('.js-query').val();
        getDataFromAPI(query, displaySearchData);
    });
}

$(function() {
    watchSubmit();
});
