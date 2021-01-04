const submitButton = document.querySelector('#submit-button');
let isCardShowing = false;

submitButton.addEventListener('click', () => {
    let chosenPokemon = document.getElementById('pokemon-chosen').value;
    //if the previous choice 
    let reset = resetNeeded();
    if (reset(chosenPokemon)) {
        resetCard();
    } 
    fetchPokemon(chosenPokemon);
});

const resetNeeded = () => {
    //previous choice is saved as an empty string initially
    let previousChoice = "";
    //return function compares previous choice to the current choice
    return (chosenPokemon) => {
        console.log(previousChoice);
        //if they are equal we want to reset the card
        if (chosenPokemon === previousChoice) {
            return true;
        //otherwise we want to update the previous choice since the choice has changed
        //also return false
        } else {
            previousChoice = chosenPokemon;
            return false;
        }
    } 
}
const resetCard = () => {
    //if the pokemon typed in is not the same as before
    console.log('previous selection ',previousSelection);
    
}

const displayData = (data) => {
    let name = data.name;
    let image = data.sprites.front_shiny;
    let baseHp = data.stats[0].base_stat;

    let imageTag = document.createElement('img');
    imageTag.src = image;
    let card = document.getElementById('card').appendChild(imageTag);
    if (!isCardShowing) {
        card.setAttribute('style', "visibility: visible");
    }
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
