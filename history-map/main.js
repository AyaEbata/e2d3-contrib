//# require=d3,leaflet

d3.select(root)
  .append('div')
  .attr('id', 'mapid')

d3.select('#mapid')
  .style('height', root.clientHeight + 'px')

function update(data) {
    // [緯度, 経度], ズーム
    var mymap = L.map('mapid').setView([51.505, -0.09], 13);
    
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors',
    }).addTo(mymap);
}
