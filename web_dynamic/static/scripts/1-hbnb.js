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
