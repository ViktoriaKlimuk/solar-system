const url = 'https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planets/';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '5180247b06msh5d67f05ee944567p1c9a3ejsn04c610b1d1bc',
        'X-RapidAPI-Host': 'planets-info-by-newbapi.p.rapidapi.com'
    }
};

function animateCard(card) {
    card.classList.add('tracking-in-expand-fwd'); // Добавляем класс анимации
}

// async function loadAndAnimateCards() {
//     try {
//         const response = await fetch(url, options);
//         const data = await response.json();

//         data.forEach(planet => {
//             const card = document.createElement('div');
//             card.classList.add('planet-card');

//             card.innerHTML = `
//                 <img class="planet-photo" src="${planet.imgSrc.img}" alt="${planet.imgSrc.imgDescription}" srcset="" />
//                 <div class="planet-div-info">
//                   <h2 class="planet-div-info-name">${planet.name}</h2>
//                   <p class="planet-div-info-desc">${planet.description}"</p>
//                   <div class="planet-div-details">
//                     <p class="planet-div-details-volume">Volume: ${planet.basicDetails.volume}"</p>
//                     <p class="planet-div-details-mass">Mass: ${planet.basicDetails.mass}"</p>
//                   </div>
//                   <a class="planet-link" href="${planet.wikiLink}" target="_blank" rel="noopener noreferrer">Source</a>
//                 </div>
//             `;

//             document.getElementById('planet-container').appendChild(card);

//             setTimeout(() => {
//                 animateCard(card);
//             }, 1000); // Добавление класса анимации с небольшой задержкой

//             window.addEventListener('scroll', function () {
//                 if (isElementInViewport(card)) {
//                     animateCard(card);
//                 }
//             });
//         });
//     } catch (error) {
//         console.error(error);
//     }
// }

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

        // Отслеживаем событие прокрутки страницы
        window.addEventListener('scroll', function () {
            // Получаем все карточки
            const cards = document.querySelectorAll('.planet-card');
            cards.forEach(card => {
                if (isElementInViewport(card)) {
                    animateCard(card);
                }
            });
        });
    } catch (error) {
        console.error(error);
    }
}

// Функция для проверки, виден ли элемент на экране
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
	// console.log(rect);
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

loadAndAnimateCards();
