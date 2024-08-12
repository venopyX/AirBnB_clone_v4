$(document).ready(function ()
{
	const selectedAmenities = {};

	$('input[type="checkbox"]').change(function ()
	{
		const amenityId = $(this).attr('data-id');
		const amenityName = $(this).attr('data-name');
		if ($(this).is(':checked'))
		{
			selectedAmenities[amenityId] = amenityName;
		} else
		{
			delete selectedAmenities[amenityId];
		}
		const amenitiesList = Object.values(selectedAmenities).join(', ');
		$('.selected-amenities').text(amenitiesList);
	});

	$.get('http://0.0.0.0:5001/api/v1/status/', function (data)
	{
		if (data.status === 'OK')
		{ // If the status is 'OK'
			$('#api_status').addClass('available');
		} else
		{
			$('#api_status').removeClass('available');
		}
	}).fail(function ()
	{
		$('#api_status').removeClass('available');
	});

	$.ajax({
		url: 'http://0.0.0.0:5001/api/v1/places_search/',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({}),
		success: function (data) {
			for (let place of data) {
				const article = $('<article></article>');
				const titleBox = $('<div class="title_box"></div>');
				titleBox.append(`<h2>${place.name || ''}</h2>`);
				titleBox.append(`<div class="price_by_night">$${place.price_by_night || 0}</div>`);
				article.append(titleBox);

				const infoBox = $('<div class="information"></div>');
				infoBox.append(`<div class="max_guest">${place.max_guest || 0} Guest${place.max_guest != 1 ? 's' : ''}</div>`);
				infoBox.append(`<div class="number_rooms">${place.number_rooms || 0} Bedroom${place.number_rooms != 1 ? 's' : ''}</div>`);
				infoBox.append(`<div class="number_bathrooms">${place.number_bathrooms || 0} Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>`);
				article.append(infoBox);

				const description = $('<div class="description"></div>');
				description.html(place.description || '');
				article.append(description);

				$('.places').append(article);
			}
		},
		error: function (error) {
            console.error('Error fetching places:', error);
        }

	});

});
