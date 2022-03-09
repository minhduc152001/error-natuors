/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibWluaGR1YzE1MjAwMSIsImEiOiJjbDBmZjFtZHIwcjF6M2RsY3p0aWloeHByIn0.p-NA3m8WaS4N5IFXXczSbA';
  var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    scrollZoom: false
    // center: [105.8407837, 20.9967994], // starting position [lng, lat]
    // zoom: 10 // starting zoom
    // interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(location => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(location.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(location.coordinates)
      .setHTML(`<p>Day ${location.day}: ${location.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(location.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 200,
      left: 150,
      right: 150
    }
  });
};
