//# require=d3,leaflet

const HOME_LAT = 35.472020834262;
const HOME_LNG = 139.62539970875;

d3.select(root)
  .append('div')
  .attr('id', 'map-container')

d3.select('#map-container')
  .style('height', root.clientHeight + 'px')

// しぇあひるずを中心に表示  setView([緯度, 経度], ズーム)
var mapLayer = L.map('map-container').setView([HOME_LAT, HOME_LNG], 15);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors',
}).addTo(mapLayer);

function update(data) {
    var listData = data.toList();

    listData.forEach(function(spot) {
        L.marker([spot['緯度'], spot['経度']])
          .addTo(mapLayer)
          .bindPopup(spot['史跡等の名称']);
    });
}
