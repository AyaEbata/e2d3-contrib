//# require=d3,leaflet

d3.select(root)
  .append('div')
  .attr('id', 'mapid')

d3.select('#mapid')
  .style('height', root.clientHeight + 'px')

function update(data) {
    // しぇあひるずを中心に表示  setView([緯度, 経度], ズーム)
    var mymap = L.map('mapid').setView([35.472020834262, 139.62539970875], 15);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors',
    }).addTo(mymap);
}
