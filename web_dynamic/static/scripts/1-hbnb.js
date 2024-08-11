$(document).ready(function () {
  let checked_id = [];
  let name_list = [];

  $('.amenity_check').change(function () {
    const cur_id = $(this).data('id');
    const cur_name = $(this).data('name');

    if ($(this).is(':checked')) {
      if (!checked_id.includes(cur_id)) {
        checked_id.push(cur_id);
        name_list.push(cur_name);
      }
    } else {
      checked_id = checked_id.filter(id => id !== cur_id);
      name_list = name_list.filter(nam => nam !== cur_name);
    }

    $('.amenities h4').text(name_list.join(", "));
  })
})