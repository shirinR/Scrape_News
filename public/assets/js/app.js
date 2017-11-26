$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});

$("#scraping").on("click", function(){
  alert('Added 20 new articles!');

  $.ajax({
    method: "GET",
    url: "/"
  }).done(function(data){
    console.log(data);

    //for (const i of data) {
      // add a for loop to create a
      // <div class="jumbotron">
      //  <h1>data.title</h1>
      // </div>
      // <p>this.summary</p>
      // <p>this.link</p>
    // }
  });
});
