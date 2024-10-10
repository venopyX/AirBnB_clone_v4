/* global $ */


window.addEventListener('load', function () {
  $.ajax('http://0.0.0.0:5001/api/v1/status').done(function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  const amenityIds = {};
  const locationIds = { states: [], cities: [] };

  $('input[type=checkbox]').click(function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');
    const isChecked = $(this).prop('checked');

    if ($(this).closest('.amenities').length > 0) {
      if (isChecked) {
        amenityIds[id] = name;
      } else {
        delete amenityIds[id];
      }
      if (Object.keys(amenityIds).length === 0) {
        $('div.amenities h4').html('&nbsp;');
      } else {
        $('div.amenities h4').text(Object.values(amenityIds).join(', '));
      }
    } else if ($(this).closest('.locations').length > 0) {
      if (isChecked) {
        if ($(this).closest('ul').parent().find('h2').length > 0) {
          locationIds.states.push({ id: id, name: name });
        } else {
          locationIds.cities.push({ id: id, name: name });
        }
      } else {
        locationIds.states = locationIds.states.filter(item => item.id !== id);
        locationIds.cities = locationIds.cities.filter(item => item.id !== id);
      }
      const selectedLocations = [...locationIds.states, ...locationIds.cities].map(item => item.name);
      if (selectedLocations.length === 0) {
        $('div.locations h4').html('&nbsp;');
      } else {
        $('div.locations h4').text(selectedLocations.join(', '));
      }
    }
  });

  function searchPlaces() {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({
        amenities: Object.keys(amenityIds),
        states: locationIds.states.map(state => state.id),
        cities: locationIds.cities.map(city => city.id)
      })
    }).done(function (data) {
      $('section.places').empty();
      for (const place of data) {
        const template = `<article>
          <div class="title">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">
              <i class="fa fa-users fa-3x" aria-hidden="true"></i>
              <br />
              ${place.max_guest} Guests
            </div>
            <div class="number_rooms">
              <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
              <br />
              ${place.number_rooms} Bedrooms
            </div>
            <div class="number_bathrooms">
              <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
              <br />
              ${place.number_bathrooms} Bathroom
            </div>
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article> <!-- End 1 PLACE Article -->`;
        $('section.places').append(template);
      }
    });
  }

  searchPlaces();

  $('button').click(function () {
    searchPlaces();
  });
});
