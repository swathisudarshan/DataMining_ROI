// See post: http://asmaloney.com/2015/06/code/clustering-markers-on-leaflet-maps

var map = L.map( 'map', {
  center: [10.0, 5.0],
  minZoom: 2,
  zoom: 2
});

L.tileLayer( 'http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
  attribution: 'TEAM: DATA CRUNCHERS',
  subdomains: ['otile1','otile2','otile3','otile4']
}).addTo( map );

var myURL = jQuery( 'script[src$="leaf-demo.js"]' ).attr( 'src' ).replace( 'leaf-demo.js', '' );

var myIcon = L.icon({
  iconUrl: myURL + 'images/pin.png',
  iconRetinaUrl: myURL + 'images/pin.png',
  iconSize: [35, 35],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});

var markerClusters = L.markerClusterGroup();

for ( var i = 0; i < scorecard.length; ++i )
{
	
	var popup = '<br/><b>College: </b>' +scorecard[i].INSTNM +
    '<br/><b>City: </b>' + scorecard[i].CITY +
    '<br/><b>State: </b> ' + scorecard[i].STABBR+
    '<br/><b>Tuition Fee: </b> ' + scorecard[i].TUITIONFEE_IN +
    '<br/><b>Mean Debt: </b> ' + scorecard[i].GRAD_DEBT_MDN;

  var m = L.marker( [scorecard[i].LATITUDE, scorecard[i].LONGITUDE], {icon: myIcon} )
                  .bindPopup( popup );

  markerClusters.addLayer( m );
}

map.addLayer( markerClusters );
