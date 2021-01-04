// *** variable declarations ***
const submitButton = document.querySelector('#submit-button');
const input = document.getElementById('pokemon-chosen'); 
let isCardShowing = false;

// *** function declarations ***
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
//dont need to check if previous is equal to current choice since that has already been checked
const resetCard = () => {   
    let element = document.getElementById('newPokemonImage');
    if (typeof(element) != 'undefined' && element != null) {
        element.remove();
    }
}

const displayData = (data) => {
    let name = data.name;
    let image = data.sprites.front_shiny;
    let baseHp = data.stats[0].base_stat;

    let imageTag = document.createElement('img');
    imageTag.src = image;
    imageTag.id = 'newPokemonImage';
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

// *** event listeners ***
let reset = resetNeeded();
submitButton.addEventListener('click', () => {
    let chosenPokemon = document.getElementById('pokemon-chosen').value;
    //if the previous choice 
    if (!reset(chosenPokemon)) {
        resetCard();
    } 
    fetchPokemon(chosenPokemon);
});

//function to press button if user presses enter
input.addEventListener('keyup', (e) => {
    //if the key pressed is the enter key
    if (e.keyCode=== 13) {
        //prevent default actions with enter key
        e.preventDefault();
        //press submit button
        submitButton.click();
    }
});

