import { handleCard } from "./section.js";

const url = 'https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planets/';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '5180247b06msh5d67f05ee944567p1c9a3ejsn04c610b1d1bc',
        'X-RapidAPI-Host': 'planets-info-by-newbapi.p.rapidapi.com'
    }
};

let allCards = [];
let currentIndex = 0;

export async function loadAndAnimateCards(handleCard) {
    try {
        const response = await fetch(url, options);
        const data = await response.json();

        data.slice(0, 8).forEach(planet => {
            const card = document.createElement('div');
            card.classList.add('planet-card');
            card.id =` ${planet.id}`

            card.innerHTML = `
                <a href="${planet.wikiLink}" target="_blank" rel="noopener noreferrer">
                <img class="planet-photo" src="${planet.imgSrc.img}" alt="${planet.imgSrc.imgDescription}" srcset="" />
                </a>
                <div class="planet-div-info">
                  <h2 class="planet-div-info-name">${planet.name}</h2>
                  <div class="planet-div-details">
                    <p class="planet-div-details-volume">Volume: ${planet.basicDetails.volume}"</p>
                    <p class="planet-div-details-mass">Mass: ${planet.basicDetails.mass}"</p>
                  </div>
                  <button class="planet-btnOpen" onclick="window.${planet.name}.showModal();">See info</button>

                    <dialog id="${planet.name}" >
                        <button class="planet-btnClose" onclick="window.${planet.name}.close();" aria-label="close">
                        <img src="./img/xmark-svgrepo-com.png" alt="" srcset="" class="pngClose">
                        </button>
                        <p class="planet-div-info-desc">${planet.description}"</p>
                        <button type="button" class="dialog-info-btn">
                            <a class="planet-link" href="${planet.wikiLink}" target="_blank" rel="noopener noreferrer">
                                Source
                            </a>
                        </button>
                      </dialog>
                </div>
            `;

            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            indicator.id = `indicator-${planet.id}`;
            // indicator.addEventListener('click', () => {
            //     showCard(data.findIndex(p => p.id === parseInt(indicator.id.split('-')[1])));
            //   });
            indicator.addEventListener('click', () => {
                const planetId = parseInt(indicator.id.split('-')[1]);
                currentIndex = data.findIndex(p => p.id === planetId);
                showCard(currentIndex);
            });
            // document.querySelector('.indicator-container').appendChild(indicator);
            document.getElementsByClassName('indicator-container')[0].appendChild(indicator);

            allCards.push(card);
            handleCard(card);
            document.getElementById('planet-container').appendChild(card);
        });

        currentIndex = 0;
        showCard(currentIndex);

		document.querySelectorAll('.planet-card').forEach(card => {
            card.style.opacity = '1';
			card.style.animation = 'tracking-in-expand-fwd 0.5s ease-out'
        });

        lazyLoad();
        
    } catch (error) {
        console.error(error);
    }
}

function lazyLoad() {
    const cardContainer = document.getElementById('planet-container');
    const scrollThreshold = 200; // Adjust as needed

    // Add an event listener for scroll events
    cardContainer.addEventListener('scroll', () => {
        const containerHeight = cardContainer.clientHeight;
        const scrollHeight = cardContainer.scrollHeight;
        const scrollTop = cardContainer.scrollTop;

        // Check if the user has scrolled to the threshold
        if (scrollHeight - scrollTop - containerHeight < scrollThreshold) {
            loadMoreCards();
        }
    });
}

async function loadMoreCards() {
    const response = await fetch(url, options);
    const data = await response.json();

    // Assuming you want to load 8 more cards each time
    data.slice(allCards.length, allCards.length + 8).forEach(planet => {
        const card = document.createElement('div');
        card.classList.add('planet-card');
        card.id = `planet-${planet.id}`; // Changed id format

        // Rest of your code for creating the card element...

        allCards.push(card);
        document.getElementById('planet-container').appendChild(card);
    });
}

export function showCard(index) {
    // console.log("showCard called with index:", index);
    if (index >= 0 && index < allCards.length) {
        document.getElementById('planet-container').innerHTML = '';
        allCards[index].style.opacity = '1';
        allCards[index].style.animation = 'tracking-in-expand-fwd 0.5s ease-out';
        document.getElementById('planet-container').appendChild(allCards[index]);
    
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, i) => {
          if (i === index) {
            indicator.classList.add('active');
          } else {
            indicator.classList.remove('active');
          }
        });
        updateButtonState()
    } else {
        console.error('Invalid index:', index);
    }
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function updateButtonState() {
    btnLeft.style.display = currentIndex === 0 ? 'none' : 'flex';
    btnRight.style.display = currentIndex === allCards.length - 1 ? 'none' : 'flex';

}

function handleClickL(e) {
    if (currentIndex > 0) {
        currentIndex--;
        showCard(currentIndex);
        updateButtonState();
        
    } 
}

function handleClickR(e) {
    if (currentIndex < allCards.length - 1) {
        currentIndex++;
        showCard(currentIndex);
        updateButtonState();
    } 

}

loadAndAnimateCards(handleCard);

const btnLeft = document.getElementById("left");
const btnRight = document.getElementById("right");

btnLeft.addEventListener("click", handleClickL);
btnRight.addEventListener("click", handleClickR);

let xStart = null;
let yStart = null;

function handleTouchStart(e) {
    xStart = e.touches[0].clientX;
    yStart = e.touches[0].clientY;
}

function handleTouchMove(e) {
    if (!xStart || !yStart) return;

    let xDiff = xStart - e.touches[0].clientX;
    let yDiff = yStart - e.touches[0].clientY;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            handleClickR();
        } else {
            handleClickL();
        }
    }

    xStart = null;
    yStart = null;
}

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);


updateButtonState();

  
