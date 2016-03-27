//# require=d3,leaflet

d3.select(root)
  .append('div')
  .attr('id', 'map-container')

d3.select('#map-container')
  .style('height', root.clientHeight + 'px')

function update(data) {
    // しぇあひるずを中心に表示  setView([緯度, 経度], ズーム)
    var mapLayer = L.map('map-container').setView([35.472020834262, 139.62539970875], 15);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors',
    }).addTo(mapLayer);
}
