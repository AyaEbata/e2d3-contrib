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
        var popup = L.marker([spot[data[0][5]], spot[data[0][6]]])
          .addTo(mapLayer);

        popup.on('click', function() {
            d3.select(root)
              .append('div')
              .attr('id', 'modal-content')
              .style({
                  'width': root.clientWidth - 100 + 'px',
                  'height': root.clientHeight - 100 + 'px'
              })
              .text(spot[data[0][0]])
              .append('div')
              .attr('id', 'close-button')
              .text('×')
              .on('click', function() {
                  d3.select('#modal-content')
                    .remove()

                  d3.select('#modal-overlay')
                    .remove()
              })

            d3.select(root)
              .append('div')
              .attr('id', 'modal-overlay')
        });
    });
}
