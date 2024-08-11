$(document).ready(function () {
  let checked_amnty_id = [];

  $('.amenity_check').change(function () {
    const cur_id = $(this).data('id');

    if ($(this).is(':checked')) {
      if (!checked_amnty_id.includes(cur_id)) {
        checked_amnty_id.push(cur_id);
      }
    } else {
      checked_amnty_id = checked_amnty_id.filter(id => id !== cur_id);
    }

    $('.amenities h4').text(checked_amnty_id.join(", "));
  })
})