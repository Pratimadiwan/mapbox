```markdown
# RouteMates - Your Route Mapping Companion

## Description

RouteMates is a web application built with HTML, CSS, and JavaScript that leverages the Mapbox API to provide interactive route mapping and location-based services. It allows users to search for locations, get directions, and discover nearby places of interest.

## Features

- **Interactive Map:** Explore a dynamic map powered by Mapbox, providing a seamless navigation experience.
- **Location Search:** Easily search for addresses and points of interest using Mapbox Geocoding API.
- **Directions:** Get turn-by-turn directions for various modes of transportation, including cycling.
- **Nearby Places:** Discover nearby restaurants, parks, hospitals, and more using Foursquare Places API.
- **Weather Information:** View real-time weather conditions at your destination using OpenWeatherMap API.

## How to Use

1. **Access the Application:** Open `index.html` in your web browser.
2. **Explore the Map:** Navigate the map using your mouse or touch screen.
3. **Search for Locations:** Enter your desired location in the search bar and click the search button.
4. **Get Directions:**  Click on the directions button on the map, enter your starting point and destination to get the route. 
5. **View Nearby Places:** Select a category from the dropdown list to view nearby places of interest.
6. **Weather Forecast:** Check the weather forecast for your destination displayed in the weather information section.

## File Structure

- **`index.html`:** Provides the main landing page with a brief introduction and instructions.
- **`map.html`:** Contains the interactive map, search bar, nearby places list, and weather information.
- **`map.js`:**  Handles all the JavaScript functionality for map interaction, API calls, and dynamic content updates.

## Dependencies

- **Mapbox API:**  Provides map data, geocoding services, and directions.
- **Foursquare Places API:**  Enables the discovery of nearby places based on location and category.
- **OpenWeatherMap API:**  Fetches real-time weather information for a given location.

## API Keys

You will need to obtain API keys for the following services to use all the features of this application:

- **Mapbox:** [https://account.mapbox.com/](https://account.mapbox.com/)
- **Foursquare:** [https://developer.foursquare.com/](https://developer.foursquare.com/)
- **OpenWeatherMap:** [https://openweathermap.org/api](https://openweathermap.org/api)

Once you have obtained your API keys, replace the placeholder values in `map.js` with your actual keys.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for new features, please open an issue or submit a pull request.
```