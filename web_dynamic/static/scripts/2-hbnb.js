$(document).ready(function () {

  $.ajax({
    url: "http://127.0.0.1:5001/api/v1/status/",
    method: 'GET',
    success: function (response) {
      if (response.status === "OK") {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }  
  });
});