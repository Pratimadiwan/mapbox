mapboxgl.accessToken = "pk.eyJ1IjoiZGlrc2hhbnQwOSIsImEiOiJjbDRxcHJidzcwdGlhM3BwYWJ5N3cxYjJsIn0.BdhlcBssxiCvs_1EN1K17w";

const foursquareApiKey = "fsq3DaWbIaLHiV7B3I36goa98hvqSCcofNiTPKWxAEIbumA="; // Replace with your actual Foursquare API key

let map;

const successLocation = (position) => {
    setupMap([position.coords.longitude, position.coords.latitude]);
}

const setupMap = (center) => {
    map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: center,
        zoom: 10
    });

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);

    var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/cycling'
    });

    map.addControl(directions, 'top-left');

    directions.on('route', (event) => {
        const destination = event.route[0].legs[0].steps.slice(-1)[0].maneuver.location;
        fetchWeather(destination[1], destination[0]);  // Latitude, Longitude
        fetchNearbyPlaces(destination[1], destination[0]);  // Fetch places based on destination
    });
}

const errorLocation = () => {
    setupMap([-2.24, 53.48]);
}

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
});

// Fetch weather information based on destination
const fetchWeather = (lat, lon) => {
    const apiKey = '90432b494eba1cab900e6e343a60bad4'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = `
                <h3>Weather at Destination</h3>
                <p>Location: ${data.name}</p>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon" />
            `;
            document.getElementById('weather-info').innerHTML = weatherInfo;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// Search for location using Mapbox Geocoding API
const searchLocation = () => {
    const location = document.getElementById('location-search').value;
    const category = document.getElementById('category-filter').value;

    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${mapboxgl.accessToken}`;

    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            if (data.features.length > 0) {
                const [lon, lat] = data.features[0].center;
                setupMap([lon, lat]);
                fetchNearbyPlaces(lat, lon, category); // Fetch nearby places based on the search result
            } else {
                alert('Location not found');
            }
        })
        .catch(error => {
            console.error('Error fetching location:', error);
        });
}

// Fetch nearby places using Foursquare Places API
const fetchNearbyPlaces = (lat, lon, category = 'restaurant') => {
    const url = `https://api.foursquare.com/v3/places/search?ll=${lat},${lon}&query=${category}&radius=2000&limit=5`;

    fetch(url, {
        headers: {
            'Authorization': foursquareApiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        const placesList = data.results.map(place => `
            <div onclick="showOnMap(${place.geocodes.main.latitude}, ${place.geocodes.main.longitude})" style="cursor: pointer;">
                <h4>${place.name}</h4>
                <p>${place.location.address || 'No address available'}</p>
                <p>Distance: ${place.distance} meters</p>
            </div>
        `).join('');
        document.getElementById('nearby-info').innerHTML = `<h3>Nearby ${category}s</h3>${placesList}`;
    })
    .catch(error => {
        console.error('Error fetching nearby places:', error);
    });
}

// Show the selected place on the map with a marker
const showOnMap = (lat, lon) => {
    // Add a marker at the selected location
    new mapboxgl.Marker()
        .setLngLat([lon, lat])
        .addTo(map);

    // Move the map center to the selected location
    map.flyTo({
        center: [lon, lat],
        zoom: 14,
        essential: true
    });
}
