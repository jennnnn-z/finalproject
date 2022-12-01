const url = 'http://localhost:3005/';

var activities = [];
$(document).ready(function(){
  getAllFaves();
  $("#getactivity").click(function(){
    $.getJSON(url + 'activity?type=' + type.value, (thing) => {
      $("#activity").empty();
      console.log("got activity");
      $("#activity").append("<p style=\"display:inline;\">You can "+ thing.activity.toLowerCase() + "! </p>");
      $("#activity").append("<button class=\"tofavorite\" id=\""+ thing.key + "\">Click to Favorite</button>");
      $("body").on('click', '#' + thing.key, (t)=>{
        console.log("calling POST on " + t.target.id);
        addFave(t.target.id);
        // remove button after clicked
        $("button").remove("#" + thing.key);
      });
    });
  });
  
  $("#list").click(function(){
    $("#allfaves").toggle();
  });
});

function getAllFaves(){
  console.log('getting all faves...');
  $("#allfaves").empty();
  $("#allfaves").append("<h2>Favorite Activities</h2>");
  $.getJSON(url + 'favorites/', (faves) => {
    console.log(faves);
    faves.forEach((fave) => {
      $("#allfaves").append("<div class=\"fave\" id=\""+ fave.key + "\">" + fave.activity + "&nbsp;<button id=\""+ fave.key + "\">Delete</button>"+"</div>");
      $("body").on('click', 'button#' + fave.key, (t)=>{
        console.log("calling DELETE on " + t.currentTarget.id);
        deleteThing(t.currentTarget.id);
        // remove all elements with the id of fave.key
        $("div").remove("#" + fave.key);
      });
    });
  });
}

function addFave(key){
  // key = key.slice(3, key.length);
  console.log(key);
  $.ajax({
    url: url + 'favorite/post/' + key,
    type: 'POST',
    success: (res) => {
      console.log('Success', res);
      getAllFaves();
    }, 
    error: () => {
      // alert('Already Favorited!');
    }
  })
}

function deleteThing(key){
  $.ajax({
    url: url + 'favorite/delete/' + key,
    type: 'DELETE',
    success: (res) => {
      console.log('Success', res);
    }, 
    error: () => {
      alert('Already Deleted!');
    }
  })
}