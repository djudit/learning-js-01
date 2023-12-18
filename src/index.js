const searchForm = document.querySelector('.js-search-form');
const list = document.querySelector('.js-list');

searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();

  const { city, days } = event.currentTarget.elements;

  serviceWeather(city.value, days.value)
    .then(data => {
      console.log(data.forecast.forecastday);
      list.innerHTML = createMarkup(data.forecast.forecastday);
    })
    .catch(error => console.log(error))
    .finaly(() => searchForm.reset());

  // console.log(city.value);
  // console.log(days.value);
  // console.dir(event.currentTarget);
}

function serviceWeather(city = '', days = 1) {
  const BASE_URL = 'http://api.weatherapi.com/v1';
  const API_KEY = '47cce444510845a3b5890337232811';

  const params = new URLSearchParams({
    key: API_KEY,
    q: city,
    days: days,
    lang: 'uk',
  });

  return fetch(`${BASE_URL}/forecast.json?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        date,
        day: {
          avgtemp_c,
          condition: { text, icon },
        },
      }) =>
        `<li class="weather-card">
        <img src="${icon}" alt="${text}" class="weather-icon">
        <h2 class="date">${date}</h2>
        <h3 class="weather-text">${text}</h3>
        <h3 class="temperature">${avgtemp_c}</h3>
    </li>`
    )
    .join('');
}
