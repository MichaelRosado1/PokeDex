const submitButton = document.querySelector('#submit-button');

submitButton.addEventListener('click', () => {
    let chosenPokemon = document.getElementById('pokemon-chosen').value;
    fetchPokemon(chosenPokemon);
});

const displayData = async (data) => {
    const name = await data.species.name;
    console.log(name);


}

const fetchPokemon = async (pokemon) => {
   if (pokemon.length > 0) {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
            let data = await response.json();
            new Promise(resolve => {
                displayData(data);
            });       
        } catch (err) {
            console.log('an error has occured:', err);
        }
    } 

}
