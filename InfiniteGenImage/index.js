const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

let photosArray = [];
let ready = false;
let imagesLoad = 0;
let totalImages = 0;


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

const apiKey = 'gB643b-X26TFNkCRaLf6cU1OzVm2If_nL3ibPwWB3As';
const count = 5;

function imageLoaded(event) {
    imagesLoad++;
    if (imagesLoad === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log(ready);
    }
}

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

async function getData() {
    try {
        const res = await fetch(apiUrl)
        photosArray = await res.json();
        displayPhotos()
    }

    catch(error) {
        console.error(error)
    }
}

//check to see if scrolling

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getData();
    }
})

