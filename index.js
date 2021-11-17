//Targets and global variables
const button = document.querySelector('#button');
const list = document.querySelector('#list');
let html = '';
let imageArray = [];
let imageUrl;
let venueArray = [];
let venueLocation;

//Function to fetch data
const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

//Function to pull apart the data from the embedded arrays and objects to insert into global variables for each event
function dataDrillDown(element) {
  imageArray = element.images;
  getCorrectImageSize(imageArray);
  venueArray = element._embedded.venues;
  venueLocation = venueArray[0].name;
}

//Function to traverse through images to get the particular ratio so that all events look the same
function getCorrectImageSize(imageArray) {
  imageUrl = imageArray.find(item => {
    if (item.ratio === '4_3') {
      return item.url;
    }
  })
}
//Function to create html for each event
const createHtml = (text) => {
  return `<h1>${text.name}</h1>
  <img src=${imageUrl.url}>
  <p>Date: ${text.dates.start.localDate} ${text.dates.start.localTime}</p>
  <p>${venueLocation}<p/>
  <a href=${text.url}>Click here to buy Tickets!</a><br>`
}

//Event listener on "Check what's on" Button to trigger api GET
button.addEventListener('click', async () => {
  const serverResponse = await getData('https://app.ticketmaster.com/discovery/v2/events.json?countryCode=AU&apikey=jQ3Pc2kAfUU4DMBr8raEp7C2PAqlpSDt');
  const narrowSearch = serverResponse._embedded.events;
    narrowSearch.forEach(item => {
      dataDrillDown(item);
      html = html + createHtml(item)
      list.innerHTML = html;
    })
})


