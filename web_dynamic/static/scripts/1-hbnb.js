/*
Listen for changes on each input checkbox tag:
if the checkbox is checked, you must store the Amenity ID in a variable (dictionary or list)
if the checkbox is unchecked, you must remove the Amenity ID from the variable
update the h4 tag inside the div Amenities with the list of Amenities checked
*/

const amenDict = {};
$(function () {
  $("input[type='checkbox']").on('change', function () {
    const amenId = $(this).data('id');
    const amenName = $(this).data('name');
    if ($(this).is(':checked')) {
      amenDict[amenId] = amenName;
    } else {
      delete amenDict[amenId];
    }
    const amenList = Object.values(amenDict).join(', ');
    $('div.amenities > h4').text(amenList)
      .css('white-space', 'nowrap')
      .css('text-overflow', 'ellipsis');
  });
});
