$(document).ready(function () {

  $.ajax({
    url: "http://127.0.0.1:5001/api/v1/status/",
    method: 'GET',
    success: function (response) {
      if (response.status === "OK") {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }  
  });
});