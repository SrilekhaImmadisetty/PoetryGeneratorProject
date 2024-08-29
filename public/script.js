document.getElementById('generate').addEventListener('click', async () => {
    const mood = document.getElementById('mood').value;
    document.body.setAttribute('data-mood', mood); // Set the data-mood attribute
    
    try {
        const response = await fetch(`/generatePoem?mood=${mood}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const poems = await response.json();
        const poemsContainer = document.getElementById('poem');
        poemsContainer.innerHTML = '';
        
        poems.forEach(poem => {
            // Split poem content into lines and format each line
            const poemLines = poem.content.split('\n').map(line => `<p>${line}</p>`).join('');
            poemsContainer.innerHTML += `<div class="poem"><h2>${poem.title}</h2>${poemLines}</div>`;
        });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
});
