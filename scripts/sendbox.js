const key = 'SSD8MJ0AQJvugdbejtIt7i9zHGymDuah';


// get  weather information
const getWeather = async (weather) => {

    const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${weather}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};

//  city information 
const getCity = async (city) => {

    const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();
// console.log(data)
    return data[0];
};

console.log(getCity('Swabi'));

/*
// getCity('Swabi').then(data => { return getWeather(data.Key);
// }).then(data =>{
//     console.log(data);
// }).catch(error => console.log(error))
*/