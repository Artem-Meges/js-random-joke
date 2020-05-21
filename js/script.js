const inputRandom = document.querySelector('#input-random'),
      inputsButtons = document.querySelector('.inputs__buttons'),
      inputFromCategories = document.querySelector('#input-from-categories'),
      inputSearch = document.querySelector('#input-search'),
      inputTextSearch = document.querySelector('#input-text-search'),
      inputGetJoke = document.querySelector('.input-get-joke'),
      jokesContainer = document.querySelector('.jokes-container'),
      favouriteContainer = document.querySelector('#favourite-container'),
      mobileBtn = document.querySelector('#mobile-btn'),
      favourite = document.querySelector('.favourite'),
      favouriteClear = document.querySelector('#favourite__clear'),
      renderJokeFavourite = document.querySelector('.render-joke__favourite');


const URL = 'https://api.chucknorris.io/jokes/random';

let jokeCard,
    favouriteJokesArr = localStorage.getItem('jokeCards') ? JSON.parse(localStorage.getItem('jokeCards')) : [];


favouriteJokesArr.forEach( joke => favouriteContainer.insertAdjacentHTML('afterbegin', joke) );

const createRandomJoke = () => {
    fetch(URL)
    .then( res => res.json() )
    .then(data => {
        let lastUpdate = Math.floor( Math.abs( new Date() - Date.parse(data.updated_at) ) / 36e5 );
            jokeCard = `<article id ="render-joke">
                            <div class="render-joke__inner">
                                <div class="render-joke__icon">
                                    <img src="img/joke-icon.svg" alt="">
                                </div>
                            
                                <div class="render-joke__info">
                                    <div class="render-joke__id">
                                        ID:
                                        <a href="${data.url}" target="_blank">${data.id}
                                        <img src="img/link.svg" alt="">
                                        </a>
                                    </div>

                                    <div class="render-joke__text">
                                        ${data.value}
                                    </div>

                                    <div class="render-joke__footer">

                                        <div class="render-joke__update">
                                            Last update: <span>${lastUpdate} hours ago</span>
                                        </div>

                                    </div>
                                </div>

                                <div class="render-joke__favourite" onclick="addToFavourite()">
                                    <img id="favourite-icon" src="img/favourite-1.svg" alt=""">
                                </div>
                            </div>
                        </article>    
                    `               
            jokesContainer.insertAdjacentHTML('afterbegin', jokeCard);
    });
     
};

const createCategoryJoke = value => {
    fetch(`${URL}?category=${value}`)
    .then( res => res.json() )
    .then(data => {
        let lastUpdate = Math.floor( Math.abs( new Date() - Date.parse(data.updated_at) ) / 36e5 );      
            jokeCard = `<article id="render-joke">
                            <div class="render-joke__inner">
                                <div class="render-joke__icon">
                                    <img src="img/joke-icon.svg" alt="">
                                </div>
                            
                                <div class="render-joke__info">
                                    <div class="render-joke__id">
                                        ID:
                                        <a href="${data.url}" target="_blank">${data.id}
                                            <img src="img/link.svg" alt="">
                                        </a>
                                    </div>

                                    <div class="render-joke__text">
                                        ${data.value}
                                    </div>

                                    <div class="render-joke__footer"> 

                                        <div class="render-joke__update">
                                            Last update: <span>${lastUpdate} hours ago</span>
                                        </div>

                                        <div class="render-joke__category">
                                            ${value}
                                        </div>

                                    </div>

                                </div>

                                <div class="render-joke__favourite" onclick="addToFavourite()">
                                    <img id="favourite-icon" src="img/favourite-1.svg" alt=""">
                                </div>
                            </div>
                    </article>
                    `  
    jokesContainer.insertAdjacentHTML('afterbegin', jokeCard);    
    }); 
};

const createSearchJoke = () => {
    fetch(`${URL.slice(0, -6)}search?query=${inputTextSearch.value}`) 
    .then( res => res.json() )
    .then(data => {
        let randomJoke = Math.floor( Math.random() * data.result.length ),
            lastUpdate = Math.floor( Math.abs( new Date() - Date.parse(data.result[randomJoke].updated_at) ) / 36e5 );
   
            jokeCard = `<article id="render-joke">
                            <div class="render-joke__inner">
                                <div class="render-joke__icon">
                                    <img src="img/joke-icon.svg" alt="">
                                </div>
                            
                                <div class="render-joke__info">
                                    <div class="render-joke__id">
                                        ID:
                                        <a href="${data.result[randomJoke].url}" target="_blank">${data.result[randomJoke].id}
                                            <img src="img/link.svg" alt="">
                                        </a>
                                    </div>

                                    <div class="render-joke__text">
                                        ${data.result[randomJoke].value}
                                    </div>

                                    <div class="render-joke__footer">

                                        <div class="render-joke__update">
                                            Last update: <span>${lastUpdate} hours ago</span>
                                        </div>

                                    </div>
                                </div>

                                <div class="render-joke__favourite" onclick="addToFavourite()">
                                    <img id="favourite-icon" src="img/favourite-1.svg" alt=""">
                                </div>
                            </div>
                    </article>
                    `
    jokesContainer.insertAdjacentHTML('afterbegin', jokeCard);  
    }); 
};

const addToFavourite = () => {
    if ( favouriteJokesArr.includes(jokeCard) || event.path[4].className != "jokes-container") return;
    favouriteJokesArr.push(jokeCard);
    localStorage.setItem( `jokeCards`, JSON.stringify(favouriteJokesArr) );
    favouriteContainer.insertAdjacentHTML('afterbegin', jokeCard);
};

$(inputRandom).on('change', () => {
    $(inputTextSearch).hide(400);
    $(inputsButtons).hide(400);
});

$(inputFromCategories).on('change', () => {
	$(inputTextSearch).hide(400);
	$(inputsButtons).slideToggle();
});

$(inputSearch).on('change', () => {
    $(inputsButtons).hide(400);
    $(inputTextSearch).slideToggle();
});

inputGetJoke.addEventListener('click', () => {
    if (inputRandom.checked) createRandomJoke()     
    else if (inputTextSearch.value) createSearchJoke();
});

favouriteClear.addEventListener('click', () => {
    localStorage.clear();
    favouriteContainer.innerHTML = "";
    while (favouriteContainer.firstChild) {
        favouriteContainer.removeChild(favouriteContainer.firstChild);
    }
});

$(mobileBtn).on('click', () => {
    $(mobileBtn).toggleClass('open');
    $(favourite).slideToggle();
    $('main').toggleClass('blackout');
});









