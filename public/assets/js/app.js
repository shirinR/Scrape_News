console.log('/////////////////////////APP js');
// $.getJSON("/", function(data) {
//   for (var i = 0; i < data.length; i++) {
//     $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//   }
// });

$(document).on("click", "#scraping", function(){

  $.ajax({
    method: "GET",
    url: "/scrape"
  }).done(function(data){
    console.log('data js >>>', data);

    data.forEach((element) => {
      $('#article_bar').append("<div class='jumbotron'><p>" + element.title + "<span> </span><button data-id='" + data._id + "'id='savearticle'>Save Article</button></p></div>");

       $('#myModal').modal();
    });
      // <div class="jumbotron">
      //  <h1>data.title</h1>
      // </div>
      // <p>this.summary</p>
      // <p>this.link</p>
    // }
  });
});

$(document).on('click', '#savearticle', function(){

  var thisId = $(this).attr('data-id');

  $.ajax({
    method: "POST",
    url: "/saved/" + thisId,
    data: {

    }
  })
});
