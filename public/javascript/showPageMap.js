mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/outdoors-v12', // style URL
    center: hike.geometry.coordinates, // starting position [lng, lat]
    zoom: 12, // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(hike.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 20 })
            .setHTML(
                `<h4>${hike.title}</h4> <p>${hike.location}</p>`
            )
    )
    .addTo(map)