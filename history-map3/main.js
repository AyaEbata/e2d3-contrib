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

                var pictMargin = 20;
                var pictContainerWidth = (root.clientWidth - (modalPadding * 2) - pictMargin) * 0.5;
                var pictContainerHeight = root.clientHeight - document.getElementById('spot').clientHeight - document.getElementById('description').clientHeight - document.getElementById('address').clientHeight - 50 - (modalPadding * 2);
       
                var magnification = 1;
                if (spot[PICT3_LABEL] !== '' && spot[PICT4_LABEL] !== '') {
                    magnification = 0.75;
                }

                modalContent
                  .append('img')
                  .attr('id', 'picture1')
                  .attr('src', spot[PICT1_LABEL])
                  .style({
                      'max-width': pictContainerWidth + 'px',
                      'max-height': pictContainerHeight * magnification + 'px',
                      'margin-right': pictMargin + 'px',
                  })
                  .on('click', function() {

                      d3.select(root)
                        .append('div')
                        .attr('id', 'pict-overlay')

                      d3.select(root)
                        .append('div')
                        .attr('id', 'preview-area')
                        .text('click the picture to close')

                      d3.select(root)
                        .append('img')
                        .attr('id', 'pict-preview')
                        .attr('src', spot[PICT1_LABEL])
                        .style({
                            'max-width': root.clientWidth + 'px',
                            'max-height': root.clientHeight - 50 + 'px'
                        })
                        .on('load', function() {
                            var width = d3.select('#pict-preview')
                              .style('width')
                              .slice(0, -2)

                            d3.select('#preview-area')
                              .style({
                                  'width': width + 20 + 'px',
                                  'height': root.clientHeight - 20 + 'px',
                                  'left': (root.clientWidth - (width + 20)) / 2 + 'px'
                              })

                            d3.select('#pict-preview')
                              .style({
                                  'left': (root.clientWidth - width) / 2 + 10 + 'px'
                              })
                        })
                        .on('click', function() {
                            d3.select('#preview-area')
                              .remove()
                            d3.select('#pict-preview')
                              .remove()
                            d3.select('#pict-overlay')
                              .remove()
                        })                  
                  })

                modalContent
                  .append('img')
                  .attr('id', 'picture2')
                  .attr('src', spot[PICT2_LABEL])
                  .style({
                      'max-width': pictContainerWidth + 'px',
                      'max-height': pictContainerHeight * magnification + 'px'
                  })

                var pictBox = modalContent
                  .append('div')
                  .attr('id', 'pict-box')

                pictBox
                  .append('img')
                  .attr('id', 'picture3')
                  .attr('src', spot[PICT3_LABEL])
                  .style({
                      'max-width': pictContainerWidth + 'px',
                      'max-height': pictContainerHeight * 0.25 + 'px',
                      'margin-right': pictMargin + 'px',
                      'margin-top': '10px'
                  })

                pictBox
                  .append('img')
                  .attr('id', 'picture4')
                  .attr('src', spot[PICT4_LABEL])
                  .style({
                      'max-width': pictContainerWidth + 'px',
                      'max-height': pictContainerHeight * 0.25 + 'px',
                      'margin-top': '10px'
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
