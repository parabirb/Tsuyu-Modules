// enum
const weatherStatesEnum = {
    0: "clear",
    1: "mostly clear",
    2: "partly cloudy",
    3: "overcast",
    45: "foggy",
    48: "foggy",
    51: "light drizzle",
    53: "moderate drizzle",
    55: "dense drizzle",
    56: "light freezing drizzle",
    57: "dense freezing drizzle",
    61: "light rain",
    63: "moderate rain",
    65: "heavy rain",
    66: "light freezing rain",
    67: "heavy freezing raain",
    71: "light snow",
    73: "moderate snow",
    75: "heavy snow",
    77: "snow",
    80: "slight rain shower",
    81: "moderate rain shower",
    82: "violent rain shower",
    85: "light snow shower",
    86: "heavy snow shower",
    95: "moderate thunderstorm",
    96: "thunderstorm with light hail",
    99: "thunderstorm with heavy hail"
};

// function
async function weather({ city }) {
    console.log(`Weather being searched: ${city}`);
    // get lat and long of the city
    let { latitude, longitude } = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
    )
        .then((res) => res.json())
        .then((res) => res.results)
        .then((res) => res[0]);
    // log
    console.log(`City found: ${latitude}, ${longitude}`);
    // get weather
    let { current } = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,precipitation,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto`).then(res => res.json());
    // return
    let weather = `The weather is currently ${weatherStatesEnum[current.weather_code]} in ${city}. It is ${current.temperature_2m} degrees fahrenheit, and there are ${current.precipitation} inches of precipitation. The wind speed is ${current.wind_speed_10m} mph. Additionally, the current time in ${city} is ${current.time}.`;
    console.log(weather);
    return weather;
}

export default {
    title: "weather",
    function: weather,
    description:
        "Fetches the weather and time in a given city.",
    args: {
        city: "The name of the city to find the weather of."
    },
};
