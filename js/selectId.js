const url = 'https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planets/';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5180247b06msh5d67f05ee944567p1c9a3ejsn04c610b1d1bc',
		'X-RapidAPI-Host': 'planets-info-by-newbapi.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const data = await response.json(); // Предполагается, что данные возвращаются в формате JSON

	// Теперь у вас есть объект data, содержащий информацию о планетах. Можете использовать эту информацию для создания карточек на вашем сайте.
	data.forEach(planet => {
		// Создайте элемент карточки
		const card = document.createElement('div');
		card.classList.add('planet-card'); // Предположим, что у вас есть стили для карточек с классом 'planet-card'
        card.classList.add('tracking-in-expand-fwd');


		// Заполните карточку данными о планете
		card.innerHTML = `
            <img class="planet-photo" src="${planet.imgSrc.img}" alt="${planet.imgSrc.imgDescription}"" srcset="" />
            <div class="planet-div-info">
              <h2 class="planet-div-info-name">${planet.name}</h2>
              <p class="planet-div-info-desc">${planet.description}"</p>
              <div class="planet-div-details">
                <p class="planet-div-details-volume">Volume: ${planet.basicDetails.volume}"</p>
                <p class="planet-div-details-mass">Mass: ${planet.basicDetails.mass}"</p>
              </div>
              <a class="planet-link" href="${planet.wikiLink}"" target="_blank" rel="noopener noreferrer">Sourse</a>
            </div>
            `;

		// Добавьте карточку на вашу страницу
		document.getElementById('planet-container').appendChild(card); // Предположим, что у вас есть контейнер с id 'planet-container', куда вы хотите добавить карточки
	});
} catch (error) {
	console.error(error);
}

