// Сделать для fav свой стиль шутки
const inputRandom = document.getElementById('input-random'),
      inputsButtons = document.querySelector('.inputs__buttons'),
      animalBtn = document.getElementById('animal-btn'),
      careerBtn = document.getElementById('career-btn'),
      celebrityBtn = document.getElementById('celebrity-btn'),
      devBtn = document.getElementById('dev-btn'),
      inputTextSearch = document.getElementById('input-text-search'),
      inputGetJoke = document.querySelector('.input-get-joke'),
      jokesContainer = document.querySelector('.jokes-container'),
      favouriteContainer = document.getElementById('favourite-container'),
      mobileBtn = document.getElementById('mobile-btn'),
      favourite = document.querySelector('.favourite'),
      favouriteClear = document.getElementById('favourite__clear');

const URL_RANDOM = 'https://api.chucknorris.io/jokes/random',
      URL_ANIMAL = 'https://api.chucknorris.io/jokes/random?category=animal',
      URL_CAREER = 'https://api.chucknorris.io/jokes/random?category=career',
      URL_CELEBRITY = 'https://api.chucknorris.io/jokes/random?category=celebrity',
      URL_DEV = 'https://api.chucknorris.io/jokes/random?category=dev';

let jokeCard,
    favouriteJokesArr = localStorage.getItem('jokeCards') ? JSON.parse(localStorage.getItem('jokeCards')) : [],
    isClickedAnimal = false,
    isClickedCareer = false,
    isClickedCelebrity = false,
    isClickedDev = false;


localStorage.setItem('jokeCards', JSON.stringify(favouriteJokesArr));
favouriteJokesArr.forEach(joke => {
    favouriteContainer.insertAdjacentHTML('afterbegin', joke);
});

const chooseRandom = () => {
    inputTextSearch.style.display = 'none';
    inputsButtons.style.display = 'none';
};      
      
const showInputTextSearch = () => {
    inputTextSearch.style.display = 'block';
    inputsButtons.style.display = 'none';
};

const showInputsButtons = () => {
    inputsButtons.style.display = 'block';
    inputTextSearch.style.display = 'none';
};

const createRandomJoke = () => {
    fetch(URL_RANDOM)
    .then(res => {
        return res.json();
    })
    .then(data => {
        let lastUpdate = Math.floor( Math.abs( new Date() - Date.parse(data.updated_at) ) / 36e5 );      
            jokeCard = `
                    <div id="render-joke">
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
                                    <img src="img/favourite.svg" alt=""">
                                </div>
                            </div>
                    </div>
                    `
    jokesContainer.insertAdjacentHTML('afterbegin', jokeCard);
    }); 
};

const createCategoryJoke = (category, url) => {
    fetch(url)
    .then(res => {
        return res.json();
    })
    .then(data => {
        let lastUpdate = Math.floor( Math.abs( new Date() - Date.parse(data.updated_at) ) / 36e5 );      
            jokeCard = `
                    <div id="render-joke">
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

                                    <div class="render-joke__update">
                                        Last update: <span>${lastUpdate} hours ago</span>
                                    </div>

                                </div>

                                <div class="render-joke__category">
                                    ${category}
                                </div>

                                <div class="render-joke__favourite" onclick="addToFavourite()">
                                    <img src="img/favourite.svg" alt=""">
                                </div>
                            </div>
                    </div>
                    `  
    jokesContainer.insertAdjacentHTML('afterbegin', jokeCard);
        
    }); 
};

const createSearchJoke = () => {
    fetch(`https://api.chucknorris.io/jokes/search?query=${inputTextSearch.value}`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        let lastUpdate = Math.floor( Math.abs( new Date() - Date.parse(data.result[0].updated_at) ) / 36e5 );      
            jokeCard = `
                    <div id="render-joke">
                            <div class="render-joke__inner">
                                <div class="render-joke__icon">
                                    <img src="img/joke-icon.svg" alt="">
                                </div>
                            
                                <div class="render-joke__info">
                                    <div class="render-joke__id">
                                        ID:
                                        <a href="${data.result[0].url}" target="_blank">${data.result[0].id}
                                        <img src="img/link.svg" alt="">
                                        </a>
                                    </div>

                                    <div class="render-joke__text">
                                        ${data.result[0].value}
                                    </div>

                                    <div class="render-joke__footer">

                                        <div class="render-joke__update">
                                            Last update: <span>${lastUpdate} hours ago</span>
                                        </div>

                                    </div>
                                </div>

                                <div class="render-joke__favourite" onclick="addToFavourite()">
                                    <img src="img/favourite.svg" alt=""">
                                </div>
                            </div>
                    </div>
                    `
    jokesContainer.insertAdjacentHTML('afterbegin', jokeCard);     
    }); 
}

const addToFavourite = () => {
    if ( favouriteJokesArr.includes(jokeCard) ) return;
    favouriteJokesArr.push(jokeCard);
    localStorage.setItem( `jokeCards`, JSON.stringify(favouriteJokesArr) );
    favouriteContainer.insertAdjacentHTML('afterbegin', jokeCard);
};

animalBtn.addEventListener('click', () => isClickedAnimal = true);
careerBtn.addEventListener('click', () => isClickedCareer = true);
celebrityBtn.addEventListener('click', () => isClickedCelebrity = true);
devBtn.addEventListener('click', () => isClickedDev = true);

inputGetJoke.addEventListener('click', () => {
    if (inputRandom.checked) createRandomJoke()
    else if (isClickedAnimal) createCategoryJoke("animal", URL_ANIMAL)
    else if (isClickedCareer) createCategoryJoke("career", URL_CAREER)
    else if (isClickedCelebrity) createCategoryJoke("celebrity", URL_CELEBRITY)
    else if (isClickedDev) createCategoryJoke("dev", URL_DEV)
    else if (inputTextSearch.value) createSearchJoke();
    
    isClickedAnimal = false;
    isClickedCareer = false;
    isClickedCelebrity = false;
    isClickedDev = false;
});

favouriteClear.addEventListener('click', () => {
    localStorage.clear();
    favouriteContainer.innerHTML = "";
})

$(mobileBtn).on('click', function() {
    $(this).toggleClass('open');
    $(favourite).slideToggle();
    $('main').toggleClass('blackout');
});










