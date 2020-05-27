// Как сделать sumbit и получать инфу какая кнопка нажата
// Разобратся с поиском по слову
// Добавление в избранное
// Если есть в избранном не добавлять
// Сердечко белое при удалении из избранного
const main = document.querySelector('main'),
      chooseJokeForm = document.querySelector('#choose-joke__form'),      
      inputRandom = document.querySelector('#input-random'),
      inputsButtons = document.querySelector('.inputs__buttons'),
      inputFromCategories = document.querySelector('#input-from-categories'),
      inputSearch = document.querySelector('#input-search'),
      inputTextSearch = document.querySelector('#input-text-search'),
      jokesContainer = document.querySelector('.jokes-container'),
      favouriteContainer = document.querySelector('#favourite-container'),
      mobileBtn = document.querySelector('#mobile-btn'),
      favourite = document.querySelector('.favourite'),
      jokesClear = document.querySelector('#jokes-clear'),
      favouriteClear = document.querySelector('#favourite__clear');

const RANDOM_URL = 'https://api.chucknorris.io/jokes/random';

let favouriteJokesArr = localStorage.getItem('jokeCards') ? JSON.parse(localStorage.getItem('jokeCards')) : []; //


favouriteJokesArr.forEach( joke => favouriteContainer.prepend(joke) );

const getURL = () => {
    let categoryURL = `${RANDOM_URL}?category=${event.target.value}`,
        searchURL = `${RANDOM_URL.slice(0, -6)}search?query=${inputTextSearch.value}`,
        currentURL;
        
    event.target.classList.value == "category-btn" ? currentURL = categoryURL : 
    inputTextSearch.value ? currentURL = searchURL : currentURL = RANDOM_URL;
    
    return currentURL;
}

const createJoke = url => {
    fetch(url)
    .then( res => res.json() )
    .then( data => {
        const category = data.categories.length ? `<div class="render-joke__category">${data.categories[0]}</div>` : '',
              lastUpdate = Math.floor( Math.abs( new Date() - Date.parse(data.updated_at) ) / 36e5 );
              
        jokeCard = document.createElement('article');
        jokeCard.className = 'render-joke';
        jokeCard.innerHTML = `
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
                                                Last update: <span>${lastUpdate}hours ago</span>
                                            </div>
                                            ${category}
                                        </div>
                                    </div>

                                    <div class="render-joke__favourite">
                                        <img id="favourite-icon" src="img/favourite-1.svg" data-backdrop="img/favourite-2.svg" alt=""">
                                    </div>
                                </div>
                            `
        jokesContainer.prepend(jokeCard);                        
        // if (inputTextSearch.value) {
        //     let randomJoke = Math.floor( Math.random() * data.result.length ),
        //         lastUpdate = Math.floor( Math.abs( new Date() - Date.parse(data.result[randomJoke].updated_at) ) / 36e5 );

        //         jokeCard = `<article id="render-joke">
        //                         <div class="render-joke__inner">
        //                             <div class="render-joke__icon">
        //                                 <img src="img/joke-icon.svg" alt="">
        //                             </div>
                
        //                             <div class="render-joke__info">
        //                                 <div class="render-joke__id">
        //                                     ID:
        //                                     <a href="${data.result[randomJoke].url}" target="_blank">${data.result[randomJoke].id}
        //                                         <img src="img/link.svg" alt="">
        //                                     </a>
        //                                 </div>

        //                                 <div class="render-joke__text">
        //                                     ${data.result[randomJoke].value}
        //                                 </div>

        //                                 <div class="render-joke__footer">
        //                                     <div class="render-joke__update">
        //                                         Last update: <span>${lastUpdate} hours ago</span>
        //                                     </div>
        //                                 </div>
        //                             </div>

        //                             <div class="render-joke__favourite">
        //                                 <img id="favourite-icon" src="img/favourite-1.svg" alt=""">
        //                             </div>
        //                         </div>
        //                     </article>`
        // } else {
        //     jokeCard = `<article id ="render-joke">
        //                     <div class="render-joke__inner">
        //                         <div class="render-joke__icon">
        //                             <img src="img/joke-icon.svg" alt="">
        //                         </div>
                            
        //                         <div class="render-joke__info">
        //                             <div class="render-joke__id">
        //                                 ID:
        //                                 <a href="${data.url}" target="_blank">${data.id}
        //                                     <img src="img/link.svg" alt="">
        //                                 </a>
        //                             </div>

        //                             <div class="render-joke__text">
        //                                 ${data.value}
        //                             </div>

        //                             <div class="render-joke__footer">
        //                                 <div class="render-joke__update">
        //                                     Last update: <span>${lastUpdate} hours ago</span>
        //                                 </div>
        //                             </div>
        //                         </div>

        //                         <div class="render-joke__favourite" onclick="addToFavourite()">
        //                             <img id="favourite-icon" src="img/favourite-1.svg" alt=""">
        //                         </div>
        //                     </div>
        //                 </article>`             
        // }     
        // jokesContainer.insertAdjacentHTML('afterbegin', jokeCard); 
        console.log(data);              
    });     
};

const addToFavourite = event => {
    const favIco = event.target.closest('#favourite-icon');

    if (!favIco) return;

    favIco.src = favIco.dataset.backdrop;

    const renderJoke = event.target.closest('.render-joke'),
          favJoke = renderJoke.cloneNode(true);         

    favouriteContainer.prepend(favJoke);
    favouriteJokesArr.push(favJoke);
    console.log(JSON.stringify(favJoke));
    
    localStorage.setItem( 'jokeCards', JSON.stringify(favouriteJokesArr) );  //
};

const removeFromFavourite = event => {
    const favIco = event.target.closest('#favourite-icon');

    if (!favIco) return;

    const favJoke = event.target.closest('.render-joke');

    favouriteContainer.remove(favJoke);
};

chooseJokeForm.addEventListener('click', event => {
    if ( event.target.closest('.category-btn') ||
         event.target.closest('.input-show-joke') ) 
         createJoke( getURL() );
});

inputRandom.addEventListener('change', () => {
    inputsButtons.style.display = "none";
    inputTextSearch.style.display = "none";
    inputTextSearch.value = '';
});

inputFromCategories.addEventListener('change', () => {
    inputsButtons.style.display = "block";
    inputTextSearch.style.display = "none";
    inputTextSearch.value = '';
});

inputSearch.addEventListener('change', () => {
    inputTextSearch.style.display = "block";
    inputsButtons.style.display = "none";
});

jokesContainer.addEventListener('click', addToFavourite);
favouriteContainer.addEventListener('click', removeFromFavourite);

jokesClear.addEventListener('click', () => jokesContainer.innerHTML = "");

favouriteClear.addEventListener('click', () => {
    localStorage.clear();
    favouriteContainer.innerHTML = "";
    while (favouriteContainer.firstChild) {
        favouriteContainer.removeChild(favouriteContainer.firstChild);
    }
});

mobileBtn.addEventListener('click', () => {
    mobileBtn.classList.toggle('open');
    favourite.classList.toggle('show');
    main.classList.toggle('blackout');
});










