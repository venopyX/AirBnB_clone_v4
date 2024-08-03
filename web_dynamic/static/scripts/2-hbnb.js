$(document).ready(function() {
    // Object to keep track of selected amenities
    var checkedAmenities = {};

    // Function to update the API status indicator
    function updateApiStatus() {
        $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
            if (data.status === 'OK') {
                $('#api_status').addClass('available').removeClass('unavailable');
            } else {
                $('#api_status').addClass('unavailable').removeClass('available');
            }
        }).fail(function() {
            $('#api_status').addClass('unavailable').removeClass('available');
        });
    }

    // Call the API status function on page load
    updateApiStatus();

    // Event handler for checkbox changes
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
