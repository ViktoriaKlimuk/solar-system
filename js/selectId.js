const url = 'https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planets/';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '5180247b06msh5d67f05ee944567p1c9a3ejsn04c610b1d1bc',
        'X-RapidAPI-Host': 'planets-info-by-newbapi.p.rapidapi.com'
    }
};

function animateCard(card) {
    card.classList.add('tracking-in-expand-fwd'); 
}

async function loadAndAnimateCards() {
    try {
        const response = await fetch(url, options);
        const data = await response.json();

        data.forEach(planet => {
            const card = document.createElement('div');
            card.classList.add('planet-card');

            card.innerHTML = `
                <img class="planet-photo" src="${planet.imgSrc.img}" alt="${planet.imgSrc.imgDescription}" srcset="" />
                <div class="planet-div-info">
                  <h2 class="planet-div-info-name">${planet.name}</h2>
                  <p class="planet-div-info-desc">${planet.description}"</p>
                  <div class="planet-div-details">
                    <p class="planet-div-details-volume">Volume: ${planet.basicDetails.volume}"</p>
                    <p class="planet-div-details-mass">Mass: ${planet.basicDetails.mass}"</p>
                  </div>
                  <a class="planet-link" href="${planet.wikiLink}" target="_blank" rel="noopener noreferrer">Source</a>
                </div>
            `;

            document.getElementById('planet-container').appendChild(card);
        });
		document.querySelectorAll('.planet-card').forEach(card => {
            card.style.opacity = '1';
			card.style.animation = 'tracking-in-expand-fwd 0.5s ease-out'
        });

        window.addEventListener('scroll', function () {
            const cards = document.querySelectorAll('.planet-card');

            cards.forEach(card => {
                if (isElementInViewport(card) && !card.classList.contains('visible')) {
                    card.classList.add('visible');
                    animateCard(card);
                }
            });
        });
    } catch (error) {
        console.error(error);
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

loadAndAnimateCards();
