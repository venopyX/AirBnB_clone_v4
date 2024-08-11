$(document).ready(function() {
  // Object to keep track of selected amenities
  const selectedAmenities = {};

  /**
   * Event listener for checkbox changes
   * Adds or removes amenities from the selectedAmenities object
   * Updates the text of the .selected-amenities element with the list of selected amenities
   */
  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).attr('data-id'); // Get the data-id attribute of the checkbox
    const amenityName = $(this).attr('data-name'); // Get the data-name attribute of the checkbox
    if ($(this).is(':checked')) { // If the checkbox is checked
      selectedAmenities[amenityId] = amenityName; // Add the amenity to the selectedAmenities object
    } else { // If the checkbox is unchecked
      delete selectedAmenities[amenityId]; // Remove the amenity from the selectedAmenities object
    }
    // Update the text of the .selected-amenities element with the list of selected amenities
    const amenitiesList = Object.values(selectedAmenities).join(', ');
    $('.selected-amenities').text(amenitiesList);
  });

  /**
   * Function to check the API status
   * Sends a GET request to the API endpoint
   * Adds the 'available' class to the #api_status element if the status is 'OK'
   * Removes the 'available' class from the #api_status element if the status is not 'OK' or the request fails
   */
  $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
    if (data.status === 'OK') { // If the status is 'OK'
      $('#api_status').addClass('available'); // Add the 'available' class to the #api_status element
    } else { // If the status is not 'OK'
      $('#api_status').removeClass('available'); // Remove the 'available' class from the #api_status element
    }
  }).fail(function() {
    $('#api_status').removeClass('available'); // Remove the 'available' class from the #api_status element if the request fails
  });
});
