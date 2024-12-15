fetch('animals.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const animalsContainer = document.getElementById('animals');
    animalsContainer.innerHTML = '';

    data.forEach(animal => {
      // Create a card
      const animalCard = document.createElement('div');
      animalCard.classList.add('animal-card');

      // Check for valid image URL
      const imgURL = animal['Image Link'] ? animal['Image Link'] : null;

      // Add image or TBA fallback
      const imgElement = document.createElement('div');
      if (imgURL) {
        const img = document.createElement('img');
        img.src = imgURL;
        img.alt = `Image of ${animal.Name}`;
        imgElement.appendChild(img);
      } else {
        imgElement.style.display = 'flex';
        imgElement.style.alignItems = 'center';
        imgElement.style.justifyContent = 'center';
        imgElement.style.background = '#f0f0f0';
        imgElement.style.color = '#666';
        imgElement.style.fontSize = '1.2em';
        imgElement.style.fontWeight = 'bold';
        imgElement.style.height = '250px';
        imgElement.innerText = 'TBA';
      }

      imgElement.classList.add('image-container'); // Common class for styling
      animalCard.appendChild(imgElement);

      // Add animal name
      const nameElement = document.createElement('h3');
      nameElement.textContent = animal.Name;
      animalCard.appendChild(nameElement);

      // Add scientific name
      const scientificNameElement = document.createElement('p');
      scientificNameElement.textContent = animal['Scientific Name'];
      animalCard.appendChild(scientificNameElement);

      // Add card to the container
      animalsContainer.appendChild(animalCard);
    });
  })
  .catch(error => {
    console.error('Error fetching animal data:', error);
    const animalsContainer = document.getElementById('animals');
    animalsContainer.innerHTML = '<p>Failed to load animal data.</p>';
  });
