var data = [{    type: 'scattermapbox',    lat: [1.3521], // Singapore latitude
    lon: [103.8198], // Singapore longitude
    text: ['Singapore'], // Marker text
    mode: 'markers',
    marker: {
        size: 12,
        color: 'red'
    }
}];

var layout = {
    title: 'Singapore Map',
    mapbox: {
        center: {
            lat: 1.3521,
            lon: 103.8198
        },
        zoom: 10,
        style: 'mapbox://styles/mapbox/streets-v11'
    }
};

Plotly.newPlot('myDiv', data, layout);
