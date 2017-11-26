console.log('/////////////////////////APP js');
// $.getJSON("/", function(data) {
//   for (var i = 0; i < data.length; i++) {
//     $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//   }
// });

$(document).on("click", "#scraping", function(){
  alert('Added 20 new articles!');

  $.ajax({
    method: "GET",
    url: "/"
  }).done(function(data){
    // console.log('/////DATA js', data);

    for (const i of data.length) {
      // <div class="jumbotron">
      //  <h1>data.title</h1>
      // </div>
      // <p>this.summary</p>
      // <p>this.link</p>

      $('#status_bar').append("<p>" + data.title + "<button data-id='" + data._id + "'id='savearticle'>Save Article</button></p>");
    }

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
