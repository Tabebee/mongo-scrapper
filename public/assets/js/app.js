// Grab the articles as a json
$.getJSON("/articles", function(data) {
    console.log(data);
    // For each one
    for (let i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        // $("#articlesHere").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
        if (data[i].savedboolean === false) {
            if (data[i].sum) {
                $("#articlesHere").append("<div class='fillMe'> <a target='_blank' href='" + data[i].link + "' data-id='" + data[i]._id + "'>"
                    + "<h3 class='articleHeader'>" + data[i].title +"</h3>" +
                    "<h5 class='articleSum'>" + data[i].sum +
                    "</h5> </a> " +
                    "<div class='cen'> <button class='saveButton' data-id='"+ data[i]._id +"'> Save </button> </div> </div>"); //close big div
            } else {
                $("#articlesHere").append("<div class='fillMe'> <a target='_blank' href='" + data[i].link + "' data-id='" + data[i]._id + "'>"
                    +"<h3 class='articleHeader'>" + data[i].title +"</h3>" +
                    "<h5 class='noSum'>" + "No Summary Available" + "</h5>" +
                    "</a>" +
                    "<div class='cen'> <button class='saveButton' data-id='"+ data[i]._id +"'> Save </button> </div> </div>"); //close big div
            }
        } //    close if else boolean false

        //  append saved articles
        if (data[i].savedboolean === true) {
            if (data[i].sum) {
                $("#savedArticlesHere").append("<div class='fillMe'> <a target='_blank' href='" + data[i].link + "' data-id='" + data[i]._id + "'>"
                    + "<h3 class='articleHeader'>" + data[i].title +"</h3>" +
                    "<h5 class='articleSum'>" + data[i].sum +
                    "</h5> </a> " +
                    "<div class='cen'> <button class='noteButton' data-id='"+ data[i]._id +"'> Add Notes </button> </div>" +
                    "<div class='cen'> <button class='deleteButton' data-id='"+ data[i]._id +"'> Delete Article </button> </div> </div>"); //close big div
            } else {
                $("#savedArticlesHere").append("<div class='fillMe'> <a target='_blank' href='" + data[i].link + "' data-id='" + data[i]._id + "'>"
                    +"<h3 class='articleHeader'>" + data[i].title +"</h3>" +
                    "<h5 class='noSum'>" + "No Summary Available" + "</h5>" +
                    "</a>" +
                    "<div class='cen'> <button class='noteButton' data-id='"+ data[i]._id +"'> Add Notes </button> </div>" +
                    "<div class='cen'> <button class='deleteButton' data-id='"+ data[i]._id +"'> Delete Article </button> </div> </div>"); //close big div
            }
        }
    }
});

//  Scrape NyTimes on scrape click
$("#scrapeButton").on("click", function () {

    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then( function (json) {
        console.log("scraped");
        // console.log(json);
        // window.location("/");
    });
});

//  on save click, change saveboolean to true to save article
$(document).on("click", ".saveButton" ,function () {

    let id = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/" + id
    }).done(function (data) {
        // console.log(data);
        // window.location("/");
        window.location("/saved");

        // setTimeout(function () {
        //     window.location("/");
        // }, 2000);
    });
}); //  close save button

//  on delete click, change saveboolean to false
$(document).on("click", ".deleteButton" ,function () {

    let id = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/delete/" + id
    }).done(function (data) {
        // console.log(data);
        // window.location("/");
        window.location("/saved");

        // setTimeout(function () {
        //     window.location("/");
        // }, 2000);
    });
}); //  close delete button

//  toggle note modal on notebuuton click
$(document).on("click", ".noteButton", function () {
    $(".modal").css("display", "block");
});



$(document).on("click", ".submitNote", function () {
    let id = $(this).attr("data-id");
    let body = $("#noteId").val().trim();

    $.ajax({
        method: "POST",
        url: "/newnote/" + id,
        data: {
            note: body
        }
    }).then(function (jj) {

    })


});








