
$('document').ready(() => {
    let amenities=[];
    $('input[type="checkbox"]').change( () => {
        const amenityId = $(this).data('id');
        const amenityName = $(this).data('name');
        $('div.amenities h4').text(selectedAmenities);
    });   
})