const url = 'http://localhost:3005/';

var activities = [];
$(document).ready(function(){

  $("#getactivity").click(function(){
    $.getJSON(url + 'activity?type=' + type.value, (typeInfo) => {
      $("#activity").empty();
      $("#activity").append("<p>You can "+ typeInfo.activity.toLowerCase() + "!</p>");
    });
  });
  
  $("#list").click(function(){
    $("#allfaves").toggle();
  });
});
