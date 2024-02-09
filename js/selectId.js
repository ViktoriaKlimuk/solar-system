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

export async function loadAndAnimateCards() {
    try {
        const response = await fetch(url, options);
        const data = await response.json();

        data.slice(0, 8).forEach(planet => {
            const card = document.createElement('div');
            card.classList.add('planet-card');
            card.id =` ${planet.id}`

            card.innerHTML = `
                <img class="planet-photo" src="${planet.imgSrc.img}" alt="${planet.imgSrc.imgDescription}" srcset="" />
                <div class="planet-div-info">
                  <h2 class="planet-div-info-name">${planet.name}</h2>
                  <div class="planet-div-details">
                    <p class="planet-div-details-volume">Volume: ${planet.basicDetails.volume}"</p>
                    <p class="planet-div-details-mass">Mass: ${planet.basicDetails.mass}"</p>
                  </div>
                  <button class="planet-btnOpen" onclick="window.${planet.name}.showModal();">See info</button>

                    <dialog id="${planet.name}">
                        <button class="planet-btnClose" onclick="window.${planet.name}.close();" aria-label="close">
                        <img src="./img/xmark-svgrepo-com.png" alt="" srcset="" class="pngClose">
                        </button>
                        <p class="planet-div-info-desc">${planet.description}"</p>
                        <a class="planet-link" href="${planet.wikiLink}" target="_blank" rel="noopener noreferrer">Source</a>
                      </dialog>
                </div>
            `;

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

        
    } catch (error) {
        console.error(error);
    }
}

export function showCard(index) {
    console.log("showCard called with index:", index);
    if (index >= 0 && index < allCards.length) {
        document.getElementById('planet-container').innerHTML = '';
        allCards[index].style.opacity = '1';
        allCards[index].style.animation = 'tracking-in-expand-fwd 0.5s ease-out';
        document.getElementById('planet-container').appendChild(allCards[index]);
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

loadAndAnimateCards(handleCard);

const btnLeft = document.getElementById("left");
const btnRight = document.getElementById("right");

btnLeft.addEventListener("click", handleClickL);
btnRight.addEventListener("click", handleClickR);


function updateButtonState() {
    btnLeft.style.display = currentIndex === 0 ? 'none' : 'flex';
    btnRight.style.display = currentIndex === allCards.length - 1 ? 'none' : 'flex';

}

function handleClickL(e) {
    // if (currentIndex > 0) {
    //     currentIndex--;
    //     showCard(currentIndex);
    // } 
    if (currentIndex > 0) {
        currentIndex--;
        showCard(currentIndex);
        updateButtonState();
    } 
}

function handleClickR(e) {
    // if (currentIndex < 7) {
    //     currentIndex++;
    //     showCard(currentIndex);
    // } 
    if (currentIndex < allCards.length - 1) {
        currentIndex++;
        showCard(currentIndex);
        updateButtonState();
    } 

}
updateButtonState();