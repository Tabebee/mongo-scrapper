// Grab the articles as a json
$.getJSON("/articles", function(data) {
    console.log(data);
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articlesHere").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

//  Scrape NyTimes on scrape click
$("#scrapeButton").on("click", function () {

    $.ajax({
        method: "GET",
        url: "/scrape"
    }).done( function (json) {
        // console.log(json);
        // window.load("/");
    });


});















