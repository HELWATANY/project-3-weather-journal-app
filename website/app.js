/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=ef7c5c7c2909ed977288f3120f903221';
const units = '&units=metric';

// Async POST
const performPostData = async (url = '', data = {}) => {

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });

  try {
    return await response.json() || await response;
  } catch (error) {
    console.log('error', error);
  }
};

// Async GET All Data
const retrieveData = async (url = '') => {
  const request = await fetch(url);
  try {
    // Transform into JSON
    return await request.json();
  } catch (error) {
    console.log('error', error);
  }
};

// Async GET Today's Weather
const getWeather = async (baseURL = '', zipCode = '', units = '', apiKey = '') => {
  const request = await fetch(baseURL+zipCode+units+apiKey);
  try {
    // Transform into JSON
    return await request.json();
  } catch (error) {
    console.log('error', error);
  }
};

// Create a new date instance dynamically with JS
function getCurrentDate() {
  let d = new Date();
  return `${d.getMonth()}.${d.getDate()}.${d.getFullYear()}`;
}

// Handle Post New Feeling
const handlePostNewFeeling = async () => {
  let valid = true;
  let errorMassagesArr = [];
  let errorMsg = 'Please check the following errors';
  let zipCode = document.querySelector('#zip').value.trim();
  let feelings = document.querySelector('#feelings').value.trim();
  let date = getCurrentDate();

  // Check for required fields
  if (!zipCode) {
    valid = false;
    errorMassagesArr.push('Zip code field is required.');
  }

  if (zipCode && zipCode.length < 3) {
    valid = false;
    errorMassagesArr.push('Zip code must be more than 3 characters.');
  }

  if (!feelings)  {
    valid = false;
    errorMassagesArr.push('Feelings field is required.');
  }

  if (feelings && feelings.length < 5) {
    valid = false;
    errorMassagesArr.push('Feelings must be more at least 5 characters.');
  }

  if (valid) {
    // Get Weather
    let weatherData = await getWeather(baseURL, zipCode, units, apiKey);
    let {temp} = weatherData.main;

    // Prepare POST data
    let data = {
      date,
      temp,
      feelings
    };

    performPostData('/addFeelings', data).then(data => {
      console.log(data);
      retrieveData('/all').then(recentFeelings => {
        displayRecentFeelings(recentFeelings);
      });
    });

  } else {
    errorMassagesArr.forEach(msg => {
      errorMsg += `\n  - ${msg}`
    });
    alert(errorMsg);
  }

};


// Handle Display Recent Feelings
function displayRecentFeelings (data) {
  let dateContainer = document.querySelector('#date');
  let tempContainer = document.querySelector('#temp');
  let contentContainer = document.querySelector('#content');

  dateContainer.innerHTML = data.date;
  tempContainer.innerHTML = data.temp;
  contentContainer.innerHTML = data.feelings;
}


// Make sure that the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Listen On Button Click
  document.querySelector('#generate').addEventListener('click', handlePostNewFeeling);
});
