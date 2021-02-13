function createAndAppend(el, className, appendTo) {
    const newEl = document.createElement(el);
    newEl.classList.add(className);
    appendTo.appendChild(newEl);
    return newEl;
}

const API_KEY = 'AIzaSyDC7hFGXldYtsiOc8gytVrB75dJKdYWFOk';
const iconSearch = document.querySelector('.fa-search');

iconSearch.addEventListener('click', function() {
    const search = document.querySelector('.search-placeholder').value;
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${search}&maxResults=9&key=AIzaSyDC7hFGXldYtsiOc8gytVrB75dJKdYWFOk`;


    const container = document.querySelector('.container');

    const oldGallery = document.querySelector('.video-container');
    if(oldGallery) {
        oldGallery.remove();
    }

    const gallery = document.createElement('div');
    gallery.style.paddingTop = '200px';
    gallery.innerText = "loading..."
    gallery.classList.add('video-container');
    container.insertAdjacentElement('beforeend', gallery);

    fetch(url).then(resp => resp.json())
    .then(data => {
        console.log({data});
        const videos = data.items.map(function(video) {
        return {
            thumbnails: video.snippet.thumbnails.high.url,
            title: video.snippet.title,
            channelTitle: video.snippet.channelTitle,
            publishTime: video.snippet.publishTime,
        }
            })
        const mainContainer = document.querySelector('.container');
    
        const oldGalleryContainer = document.querySelector('.video-container');
        if(oldGalleryContainer) {
            oldGalleryContainer.remove();
        }

        const videoContainer = document.createElement('div');
        videoContainer.classList.add('video-container');
        mainContainer.insertAdjacentElement('beforeend', videoContainer);

        for(let i = 0; i < videos.length; i++) {
            const smallContainer = createAndAppend('div', 'small-container', videoContainer);
            const video = createAndAppend('img', 'video', smallContainer);
            video.src = videos[i].thumbnails;
            const textContainer = createAndAppend('div', 'text-container', smallContainer);
            const h1 = createAndAppend('h1', 'video-name', textContainer);
            h1.textContent = videos[i].title.slice(0, 60);
            const chanelName = createAndAppend('span', 'chanel-name', textContainer);
            chanelName.textContent = videos[i].channelTitle;
            const dateCalculator = createAndAppend('div', 'date', textContainer);
            dateCalculator.textContent = new Date(videos[i].publishTime).toLocaleDateString();
         }
     })
})
