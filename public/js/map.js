

 
const map = new mapboxgl.Map({
  accessToken:mapToken,
  container: 'map',
  // style: 'mapbox://styles/mapbox/standard', // Use the standard style for the map
  projection: 'globe', // display the map as a globe
  zoom: 8, // initial zoom level, 0 is the world view, higher values zoom in
  center: coordinate,// center the map on this longitude and latitude

});

// map.addControl(new mapboxgl.NavigationControl());
map.scrollZoom.enable();

map.on('style.load', () => {
  map.setFog({}); // Set the default atmosphere style
});



const marker = new mapboxgl.Marker({
  color:"red",
  cursor:"pointer"
})
.setLngLat(coordinate)  //Listing.geometry.coordinate
.addTo(map)
.setRotationAlignment('horizon');




const popup = new mapboxgl.Popup({ offset: 25 })
  .setHTML(`<h4>${listing.title}</h4><p>Exact Location will be provided after booking</p>`);

 marker.setPopup(popup);



 