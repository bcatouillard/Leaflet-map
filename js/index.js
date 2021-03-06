const mapboxUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmNhdG91aWxsYXJkIiwiYSI6ImNrZ2pkamMxczA4aXkycW52MG96Mmg3dHQifQ.ctN6aeNIwVMY0zkf8MMDVQ'
const mapboxAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'

	var grayscale   = L.tileLayer(mapboxUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution}),
		streets  = L.tileLayer(mapboxUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution});

const mymap = L.map('mapid', {
		center: [50.6333, 3.0667],
		zoom: 10,
		layers: [grayscale]
	});

const baseMaps = {
    "Grayscale": grayscale,
    "Streets": streets
};

L.control.layers(baseMaps).addTo(mymap);


const onMapClick = (e) => {
    callAPI(e.latlng.lat, e.latlng.lng)
}


const callAPI = (lat, lng) => {
    const marker = L.marker([lat, lng]).addTo(mymap);
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=7a4bd91fb4a07bda24188bc152e8d9ea`)
        .then(response => response.json())
        .then(data => {

            marker.bindPopup(`Ville : ${data.name} <br>Température : ${data.main.temp}°C`).openPopup();
        })
}


const useGeoLocation = () => {
    navigator.geolocation.watchPosition(position => {
        callAPI(position.coords.latitude, position.coords.longitude);
    });
}

mymap.on('click', onMapClick)
window.addEventListener('load', useGeoLocation())