const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');
const text = document.querySelector('.text-input')
const button = document.querySelector('.button')

let photosArray = [];
let ready = false;
let imagesLoad = 0;
let totalImages = 0;
let searchTerm = 'nature'
let prevSearchTerm = '';

const apiKey = 'gB643b-X26TFNkCRaLf6cU1OzVm2If_nL3ibPwWB3As';
const count = 15;

//getlinks and add to DOM
function displayPhotos() {
    imagesLoad = 0;
    totalImages = photosArray.length;
    console.log('totalImages', totalImages)
    photosArray.forEach(photo => {
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '__blank');
        //Create image
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        item.appendChild(img)

        //Event Listener
        img.addEventListener('load', imageLoaded)
        imageContainer.appendChild(item)
        console.log('Got photos')
    })   
}

//Unsplash API 

function imageLoaded() {
    imagesLoad++;
    if (imagesLoad === totalImages) {
        ready = true;
        //loader.hidden = true;
        console.log(ready);
    }
}

//remove previous html elements
function removeElements(num) {
    console.log(num);
    const anchorList = [...document.querySelectorAll('a')].slice(0, num);
    console.log(anchorList)
    for(const anchor of anchorList) {
        anchor.remove()
    }
}

async function getData() {
    const userSearchTerm = text.value
    console.log(searchTerm, userSearchTerm, prevSearchTerm)
    if(userSearchTerm !== '') {
        searchTerm = userSearchTerm
        prevSearchTerm = userSearchTerm
    }
    if(userSearchTerm == prevSearchTerm) {
        removeElements(photosArray.length)
    }
    console.log(searchTerm);
    const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query='${searchTerm}`
    try {
        const res = await fetch(apiUrl)
        const photosObj = await res.json();
        photosArray = photosObj
        displayPhotos()
    }
    catch(error) {
        console.error(error)
    }
}

//submit search using input from user
const userSearchTerm = text.value

function submitData() {
    getData()
    text.value = ''
}

button.addEventListener('click', submitData)
text.addEventListener('keypress', (e) => {
    if(e.key == "Enter") {
        submitData()
    }
})

//check to see if scrolling

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getData();
    }
})

getData();