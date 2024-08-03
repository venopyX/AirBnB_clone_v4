$(document).ready(function() {
    // this functiob will be triggered when a checkbox is called
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