mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: hike.geometry.coordinates, // starting position [lng, lat]
    zoom: 11, // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(hike.geometry.coordinates)
    .addTo(map)