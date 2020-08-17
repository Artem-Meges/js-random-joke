const findJokeForm = document.querySelector('#find-joke__form'),      
      jokesContainer = document.querySelector('#jokes-container'),
      categoryButtons = document.querySelector('.category-buttons'),
      textSearch = document.querySelector('#input-text-search'),
      favouriteContainer = document.querySelector('#favourite-container'),
      searchClear = document.querySelector('#search-clear'),
      favouriteClear = document.querySelector('#favourite__clear'),
      mobileBtn = document.querySelector('#mobile-btn'),
      favourite = document.querySelector('#favourite'),
      favouriteWrapper = document.querySelector('#favourite-wrapper');

const URL = 'https://api.chucknorris.io/jokes/random';

let data = localStorage.getItem('fav-jokes'),
    favJokes,
    temporaryJokes = [];

if (data) {
    favJokes = JSON.parse(data);
    loadJokes(favJokes);
} else {
    favJokes = [];
}

function loadJokes(favJokes) {
    favJokes.forEach( data => jokeMaker(data, favouriteContainer) );
}

function getData(url) {
    fetch(url)
        .then( data => data.json() )
        .then(data => {
            if (data.result) {
                const max = data.result.length;
                const randomNum = Math.floor(Math.random() * max);   //

                const favourite = favJokes.find(item => item.id === data.result[randomNum].id);
                if (favourite) {
                    jokeMaker(favourite, jokesContainer);
                } else {
                    jokeMaker(data.result[randomNum], jokesContainer);
                }
            } else {
                const favourite = favJokes.find(item => item.id === `j${data.id}`);

                if (favourite) {
                    jokeMaker(favourite, jokesContainer);
                } else {
                    jokeMaker(data, jokesContainer);
                }
            }
        });
}

function jokeMaker(data, container) {
    const { id, url, value, categories, isFavourite = false } = data;
    let { updated_at } = data;

    if ( typeof(updated_at) === 'string' ) {
        updated_at = Math.floor(Math.abs( new Date() - new Date(updated_at) ) / 36e5);
    }

    temporaryJokes.push({ id, url, value, updated_at, categories, isFavourite });

    const fav = isFavourite ? 'fav' : 'random';

    const category = categories.length ? 
    `<span class="joke-card__category">${categories[0]}</span>` : '';

    const out = `<article class="joke-card" id="j${id}">
                    <div class="joke-card__inner">
                        <div class="joke-card__img">
                            <img src="img/joke-icon.svg">
                        </div>
        
                        <div class="joke-card__info">
                            <div class="joke-card__id">
                                ID:
                                <a href="${url}" target="_blank">
                                    ${id}
                                    <img src="img/link.svg" alt="link">
                                </a>
                            </div>

                            <div class="joke-card__text">
                                ${value}
                            </div>

                                <footer class="joke-card__footer">
                                    <div class="joke-card__update">
                                        Last update: <span>${updated_at} hours ago</span>
                                    </div>
                                    ${category}
                                </footer>
                        </div>

                        <div class="joke-card__favourite ${fav}-joke-icon"></div>

                    </div>
                </article>`;

    container.insertAdjacentHTML('afterbegin', out);
}

function addToFavourite(icon, id) {
    const joke = temporaryJokes.find(item => `j${item.id}` === id);

    if ( favJokes.includes(joke) ) return;

    icon.classList.add('fav-joke-icon');
    icon.classList.remove('random-joke-icon');

    joke.isFavourite = true;
    favJokes.push(joke);

    localStorage.setItem( 'fav-jokes', JSON.stringify(favJokes) );
    jokeMaker(joke, favouriteContainer);
}

function removeFromFavourite(icon, id, parent) {
    icon.classList.remove('fav-joke-icon');
    icon.classList.add('random-joke-icon');

    favJokes = favJokes.filter(item => `j${item.id}` !== id);

    const joke = temporaryJokes.find(item => `j${item.id}` === id);
    joke.isFavourite = false;

    if (parent === jokesContainer) {
        favouriteContainer.querySelector(`#${id}`).remove();
    } else {
        if ( jokesContainer.querySelector(`#${id}`) ) {
            const card = jokesContainer.querySelector(`#${id}`)
                .querySelector('.joke-card__favourite');

            card.classList.remove('fav-joke-icon');
            card.classList.add('random-joke-icon');
        }

        favouriteContainer.querySelector(`#${id}`).remove();
    }


    localStorage.setItem( 'fav-jokes', JSON.stringify(favJokes) );
}

findJokeForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const checkedElem = this.querySelector('input:checked');
    if (!checkedElem) return;

    if (checkedElem.value === 'random') 
        getData(URL);

    if (checkedElem.value === 'categories') {
        if (categoryButtons.querySelector('input:checked')) {
            const category = categoryButtons.querySelector('input:checked').value;
            
            getData(URL + `?category=${category}`);
        } else return;
    }

    if (checkedElem.value === 'search' && textSearch.value) 
        getData( URL.slice(0, -7) + `/search?query=${textSearch.value.trim()}` );
    
});

findJokeForm.addEventListener('click', function(e) {
    const target = e.target;
    
    if ( target.closest('.random') ) {
        categoryButtons.classList.remove('show');
        textSearch.classList.remove('show');
    }
    
    if ( target.closest('.categories') ) {
        textSearch.classList.remove('show');
        categoryButtons.classList.add('show');
    }

    if ( target.closest('.search') ) {
        textSearch.classList.add('show');
        categoryButtons.classList.remove('show');
    }
});

jokesContainer.addEventListener('click', function(e) {
    const target = e.target,
        favIcon = target.closest('.joke-card__favourite');

    if (!favIcon) return;

    const jokeCardId = target.closest('.joke-card').id;

    if ( favIcon.matches('.fav-joke-icon') ) {
        removeFromFavourite(favIcon, jokeCardId, this);
    } else {
        addToFavourite(favIcon, jokeCardId);
    }
});

favouriteContainer.addEventListener('click', function(e) {
    const target = e.target,
        favIcon = target.closest('.joke-card__favourite');

    if (!favIcon) return;

    const jokeCardId = target.closest('.joke-card').id;

    removeFromFavourite(favIcon, jokeCardId, this);
});

favouriteClear.addEventListener('click', function() {
    localStorage.clear();

    favJokes.forEach(item => {
        if ( jokesContainer.querySelector(`#j${item.id}`) ) {
            const card = jokesContainer.querySelector(`#j${item.id}`)
                .querySelector('.joke-card__favourite');

            card.classList.remove('fav-joke-icon');
            card.classList.add('random-joke-icon');
        }
    });

    favJokes.length = 0;
    favouriteContainer.innerHTML = '';
});

searchClear.addEventListener('click', function(e) {
    e.preventDefault();
    jokesContainer.innerHTML = '';
});

mobileBtn.addEventListener('click', function() {
    mobileBtn.classList.toggle('open');
    favouriteWrapper.classList.toggle('show');
});










