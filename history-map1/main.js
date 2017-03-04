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
        var popupText = '<div class="spot">' + spot[data[0][0]] + '</div>'
                + '<div class="description">' + spot[data[0][2]] + '</div>'
                + '<div class="pict-box">'
                + '<div class="left-box"><div>昔の写真</div><img class="old-picture" src="' + spot[data[0][3]] + '"></div>'
                + '<div class="right-box"><div>今の写真</div><img class="now-picture" src="' + spot[data[0][4]] + '"></div>'
                + '</div>'
                + '<div class="address">' + spot[data[0][1]] + '</div>';

        L.marker([spot[data[0][5]], spot[data[0][6]]])
          .addTo(mapLayer)
          .bindPopup(popupText);
    });
}
