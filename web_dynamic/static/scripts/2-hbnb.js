$(document).ready(function() {
    var checkedAmenities = {};

    $('input[type="checkbox"]').change(function() {
        const amenityId = $(this).data('id');
        const amenityName = $(this).data('name');

        if ($(this).is(':checked')) {
            checkedAmenities[amenityId] = amenityName;
        } else {
            delete checkedAmenities[amenityId];
        }

        // Update the display
        const $h4 = $('div.amenities h4');
        $h4.text(Object.values(checkedAmenities).join(', '));
    });
});
document.addEventListener('DOMContentLoaded', function () {
  const apiStatusDiv = document.getElementById('api_status');

  function updateApiStatus() {
      fetch('http://0.0.0.0:5001/api/v1/status/')
          .then(response => response.json())
          .then(data => {
              if (data.status === 'OK') {
                  apiStatusDiv.classList.add('available');
              } else {
                  apiStatusDiv.classList.remove('available');
              }
          })
          .catch(() => {
              apiStatusDiv.classList.remove('available');
          });
  }

  updateApiStatus();
  // Optionally, you can update the status periodically
  setInterval(updateApiStatus, 5000); // Check every 5 seconds
});

