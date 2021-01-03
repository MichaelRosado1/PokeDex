const submitButton = document.querySelector('#submit-button');

submitButton.addEventListener('click', () => {
    let chosenPokemon = document.getElementById('pokemon-chosen').value;
    //if the previous choice 
    let reset = resetNeeded();
    if (reset(chosenPokemon)) {
        resetCard();
    } else {
        fetchPokemon(chosenPokemon);
    }
});
const resetNeeded = () => {
    let previousChoice = "";
    return (chosenPokemon) => {
        if (chosenPokemon === previousChoice) {
            return true;
        } else {
            previousChoice = chosenPokemon;
            return false;
        }
    } 
}
const resetCard = () => {
    //if the pokemon typed in is not the same as before
    console.log('previous selection ',previousSelection);
    if (document.querySelector('#pokemon-chosen').value != previousSelection) {
        //we want to clear every element so it won't add onto the previous data
        let elements = document.querySelectorAll('.card');

        elements.forEach((currentElement) => {
            currentElement.value = '';
        })
    }
}

const displayData = (data) => {
    let name = data.name;
    let image = data.sprites.front_shiny;
    let baseHp = data.stats[0].base_stat;

    let imageTag = document.createElement('img');
    imageTag.src = image;
    document.querySelector('.card').appendChild(imageTag);
    console.log(name);
    console.log(image);
    console.log(baseHp);
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
