$(document).ready(() => {

    const selectedAmenities = {};


    $('input[type="checkbox"]').change(function() {
        const amenityID = $(this).attr('data-id');
        const amenityName = $(this).attr('data-name');


        if ($(this).is(':checked')) {
            selectedAmenities[amenityId] = amenityName;
        } else {
            delete selectedAmenities[amenityId];
        }


        const amenitiesList = object.values(selectedAmenities).join(',  ');
        $('.amenities h4').text('Amenities: ' + amenitiesList);
   });


        $.get('http://0.0.0.0:5001/api/v1/status/', (data) => {
            if(data.status == 'OK') {
               $('#api_status').addClass('available');
            } else {
                $('#api_status').removeClass('available');
            }
   });
});
