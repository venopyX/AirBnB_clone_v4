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
document.addEventListener('DOMContentLoaded', function () {
  const apiStatusDiv = document.getElementById('api_status');

  function updateApiStatus() {
      fetch('http://0.0.0.0:5001/api/v1/status/')
          .then(response => response.json())
          .then(data => {
              if (data.status === 'OK') {
                  apiStatusDiv.classList.add('available');
              } else {
                  apiStatusDiv.classList.remove('available');
              }
          })
          .catch(() => {
              apiStatusDiv.classList.remove('available');
          });
  }

  updateApiStatus();
  // Optionally, you can update the status periodically
  setInterval(updateApiStatus, 5000); // Check every 5 seconds
});
document.addEventListener('DOMContentLoaded', function() {
    fetch('http://0.0.0.0:5001/api/v1/places_search/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
        const placesSection = document.querySelector('.places');
        data.forEach(place => {
            const article = document.createElement('article');
            article.innerHTML = `
                <h2>${place.name}</h2>
                <div class="price_by_night">
                    $${place.price_by_night}
                </div>
                <div class="information">
                    <div class="max_guest">
                        ${place.max_guest} Guests
                    </div>
                    <div class="number_rooms">
                        ${place.number_rooms} Bedrooms
                    </div>
                    <div class="number_bathrooms">
                        ${place.number_bathrooms} Bathrooms
                    </div>
                </div>
                <div class="description">
                    ${place.description}
                </div>
            `;
            placesSection.appendChild(article);
        });
    })
    .catch(error => console.error('Error:', error));
});

$('#search').click(function() {
    const filters = {amenities: Object.keys(checkedAmenities)};
    search(filters);
});