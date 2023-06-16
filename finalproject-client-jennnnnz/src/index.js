const url = 'http://localhost:3005/';

var activities = [];
$(document).ready(function(){
  // getAllFaves();
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
  
  $("#refresh").click(function(){
    // $("#allfaves").toggle();
    getAllFaves();
  });

  
});

function getAllFaves(){
  console.log('getting all faves...');
  $("#allfaves").empty();
  $("#allfaves").append("<h2>Favorite Activities</h2>");
  $.getJSON(url + 'favorites/', (faves) => {
    console.log(faves);
    faves.forEach((fave) => {
      $("#allfaves").append("<div style=\"display:inline;\" id=\""+ fave.key + "\">" + fave.activity + "&nbsp;</div>");
      // $("#allfaves").append("<p><code>data-ma-enter='submit'</code><span data-malleable='true' data-ma-blur='submit'>" + fave.activity + "</span></p>");
      // $("#allfaves").append("<a href=\"#\" id=\"username\" data-type=\"text\" data-pk="1" data-title=\"Enter username\" class=\"editable editable-click\" style=\"display: inline; background-color: rgba(0, 0, 0, 0);\">superuse</a>");
      $("div#" + fave.key).append("<button class=\"edit\" id=\""+ fave.key + "\">Edit</button>&nbsp;");
      $("div#" + fave.key).append("<button class=\"delete\" id=\""+ fave.key + "\">Delete</button><br>");
      $("body").on('click', 'button#' + fave.key + ".delete", (t)=>{
        console.log("calling DELETE on " + t.currentTarget.id);
        deleteThing(t.currentTarget.id);
      });
      $("body").on('click', 'button#' + fave.key + ".edit", (t)=>{
        console.log("calling PUT on " + t.currentTarget.id + ": " + fave.activity);
        let newActivity = prompt("Enter new activity", fave.activity);
        console.log(newActivity);
        editFave(t.currentTarget.id, newActivity);
        // prompt("Edit Activity", fave.activity, (activity) => {
        //   editFave(t.currentTarget.id, activity);
        // }
      });
      // // on keypress enter run editFave
      // $(".edit").on('keypress', '.edit', (t)=>{
      //   if (t.which == 13){
      //     console.log("pressed ENTER");
      //     editFave(t.target.id, t.target.innerText);
      //   }
      // });
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
      // getAllFaves();
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
      // remove all items with the id of key 
      $("div").remove("#" + key);
    }, 
    error: () => {
      alert('Already Deleted!');
    }
  })
}


function editFave(key, activity){
  console.log('editing fave...' + key + ": " + activity);
  const body = {
    'key': key,
    'activity': activity
  };
  $.ajax({
    url: url + 'favorite/update/',
    type: 'PUT',
    data: JSON.stringify(body),
    dataType: 'json',
    contentType: 'application/json',
  })
}

