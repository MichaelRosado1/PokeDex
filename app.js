const submitButton = document.querySelector('#submit-button');

submitButton.addEventListener('click', () => {
    let chosenPokemon = document.getElementById('pokemon-chosen').value;
    let data = fetchPokemon(chosenPokemon);
    displayData(data);
});

const displayData = (data) => {
    console.log(data);
}

const fetchPokemon = async (pokemon) => {
   if (pokemon.length >0) {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
            let data = await response.json();
            return data;
            
        } catch (err) {
            console.log('an error has occured:', err);
        }
    } 

    console.log('input length is too short');
}
