


function createMap(lat,lon,zoom) {
  // We’ll add a tile layer to add to our map, in this case it’s a OSM tile layer.
  // Creating a tile layer usually involves setting the URL template for the tile images
  var osmUrl = "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
    osmAttrib =
      '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    osm = L.tileLayer(osmUrl, {
      maxZoom: 18,
      attribution: osmAttrib
    });

  // initialize the map on the "map" div with a given center and zoom
  var map = L.map("map")
    .setView([lat, lon], zoom)
    .addLayer(osm);
  
    //map style  
  L.tileLayer.provider('Stamen.Watercolor').addTo(map);
  L.tileLayer.provider('Stamen.TonerLines').addTo(map);
  L.tileLayer.provider('Stamen.TonerLabels').addTo(map);

  return map
}

function createISSMarker(lat,lon,map){
    var issIcon = L.icon({
      iconUrl: './img/iss.png',

      iconSize:     [150,150], // size of the icon
      iconAnchor:   [75, 75], // point of the icon which will correspond to marker's location
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
  L.marker([lat, lon],{icon: issIcon}).addTo(map);
}

async function init(){
    //fetch iss data
    var response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
    var data = await response.json();
    var {latitude,longitude} = data;
    var map = createMap(latitude, longitude, 4);
    createISSMarker(latitude, longitude,map)
}

init()