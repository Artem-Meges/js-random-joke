const inputRandom = document.getElementById('input-random'),
      inputFromCategories = document.querySelector('.input-from-categories'),
      inputsButtons = document.querySelector('.inputs__buttons'),
      animalBtn = document.getElementById('animal-btn'),
      careerBtn = document.querySelector('.career-btn'),
      celebrityBtn = document.querySelector('.celebrity-btn'),
      devBtn = document.querySelector('.dev-btn'),
      inputSearch = document.querySelector('.input-search'),
      inputTextSearch = document.querySelector('.input-text-search'),
      inputGetJoke = document.querySelector('.input-get-joke'),
      renderJoke = document.querySelector('.render-joke'),
      renderJokeId = document.querySelector('.render-joke__id'),
      renderJokeText = document.querySelector('.render-joke__text'),
      renderJokeUpdate = document.querySelector('.render-joke__update'),
      renderJokeCategory = document.querySelector('.render-joke__category'),
      renderJokeFavourite = document.querySelector('.render-joke__favourite'),
      jokesContainer = document.querySelector('.jokes-container');


    
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

const createJoke = (url) => {
    fetch(url)
    .then(res => {
        return res.json();
    })
    .then(data => {
        let jokeText = data.value,
            jokeId = data.id,
            lastUpdate = Math.floor( Math.abs( new Date() - Date.parse(data.updated_at) ) / 36e5 ),
            jokeCategory = data.categories,
            jokeLink = data.url;
        
        let markup = `
        <div class="render-joke">
                <div class="render-joke__inner">
                <div class="render-joke__icon">
                    <img src="img/joke-icon.svg" alt="">
                </div>
                
                <div class="render-joke__info">
                    <div class="render-joke__id">
                        ID:
                        <a href="${jokeLink}" target="_blank">${jokeId}
                           <img src="img/link.svg" alt="">
                        </a>
                    </div>

                    <div class="render-joke__text">
                        ${jokeText}
                    </div>

                    <div class="render-joke__footer">

                        <div class="render-joke__update">
                            Last update: <span>${lastUpdate} hours ago</span>
                        </div>

                    </div>
                </div>

                <div class="render-joke__favourite">
                    <img src="img/favourite.svg" alt="">
                </div>
            </div>
        </div>
        `

    jokesContainer.insertAdjacentHTML('afterbegin', markup); 
    console.log(data);
       
    }); 
}

inputGetJoke.addEventListener('click', () => {
    if (inputRandom.checked) {
        createJoke('https://api.chucknorris.io/jokes/random');
    } else if (animalBtn.clicked) {
        
    }
});



