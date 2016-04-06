//# require=d3,leaflet

const HOME_LAT = 35.475846;
const HOME_LNG = 139.628833;

d3.select(root)
  .append('div')
  .attr('id', 'map-container')

d3.select('#map-container')
  .style({
      'height': root.clientHeight + 'px',
      'width': root.clientWidth + 'px'
  })

// しぇあひるずを中心に表示  setView([緯度, 経度], ズーム)
var mapLayer = L.map('map-container').setView([HOME_LAT, HOME_LNG], 15);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors',
}).addTo(mapLayer);

function update(data) {
    const SPOT_NAME_LABEL = data[0][0];
    const ADDRESS_LABEL = data[0][1];
    const DESCRIPTION_LABEL = data[0][2];
    const LAT_LABEL = data[0][3];
    const LNG_LABEL = data[0][4];
    const PICT1_LABEL = data[0][5];
    const PICT2_LABEL = data[0][6];
    const PICT3_LABEL = data[0][7];
    const PICT4_LABEL = data[0][8];

    var listData = data.toList();

    listData.forEach(function(spot) {
        var marker = L.marker([spot[LAT_LABEL], spot[LNG_LABEL]])
          .addTo(mapLayer)
          .bindPopup(spot[SPOT_NAME_LABEL]);

        marker.on('click', function() {
            d3.select('.leaflet-popup-content').on('click', function() {

                d3.select('.leaflet-control')
                  .style('display', 'none')

                var modalPadding = root.clientHeight / 20;

                var modalContent = d3.select(root)
                  .append('div')
                  .attr('id', 'modal-content')
                  .style({
                      'padding': modalPadding + 'px',
                      'width': root.clientWidth - (modalPadding * 2) + 'px',
                      'height': root.clientHeight - (modalPadding * 2) + 'px'
                  })

                modalContent
                  .append('div')
                  .attr('id', 'spot')
                  .text(spot[SPOT_NAME_LABEL])

                modalContent
                  .append('div')
                  .attr('id', 'description')
                  .text(spot[DESCRIPTION_LABEL])

                modalContent
                  .append('div')
                  .attr('id', 'address')
                  .text(spot[ADDRESS_LABEL])
                  .style({
                      'position': 'absolute',
                      'bottom': modalPadding + 'px'
                  })

                var pictContainerWidth = (root.clientWidth - 20 - (modalPadding * 2)) * 0.5 + 'px';
                var pictContainerHeight = root.clientHeight - document.getElementById('spot').clientHeight - document.getElementById('description').clientHeight - document.getElementById('address').clientHeight - 30 - (modalPadding * 2) + 'px';

                modalContent
                  .append('img')
                  .attr('id', 'picture1')
                  .attr('src', spot[PICT1_LABEL])
                  .style({
                      'max-width': pictContainerWidth,
                      'max-height': pictContainerHeight,
                      'margin-right': '20px'
                  })

                modalContent
                  .append('img')
                  .attr('id', 'picture2')
                  .attr('src', spot[PICT2_LABEL])
                  .style({
                      'max-width': pictContainerWidth,
                      'max-height': pictContainerHeight
                  })

                modalContent
                  .append('div')
                  .attr('id', 'close-button')
                  .text('×')
                  .on('click', function() {
                      d3.select('#modal-content')
                        .remove()
                      d3.select('#modal-overlay')
                        .remove()

                      d3.select('.leaflet-control')
                        .style('display', 'block')
                  })

                d3.select(root)
                  .append('div')
                  .attr('id', 'modal-overlay')
            })
        });
    });
}
