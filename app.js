// *** variable declarations ***
const submitButton = document.querySelector('#submit-button');
const input = document.getElementById('pokemon-chosen'); 

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
    //stores name, image, and a base hp stat from the given pokemon
    let name = data.name;
    let image = data.sprites.front_shiny;
    let baseHp = data.stats[0].base_stat;


    //creates tags and assigns properties to them based on the content
    let imageTag = document.createElement('img');
    imageTag.src = image;
    imageTag.id = 'newPokemonImage';

    let newh1 = document.createElement("h1");
    let h1content = document.createTextNode(name);
    newh1.appendChild(h1content);
    newh1.id = 'nametag';

    let newp = document.createElement("p");
    let pcontent = document.createTextNode(baseHp);
    newp.appendChild(pcontent);

    let card = document.getElementById('card');
    card.appendChild(imageTag); 
    card.appendChild(newh1);
    card.appendChild(newp);
    

}

const fetchPokemon = async (pokemon) => {
   if (pokemon.length > 0) {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
            let data = await response.json();
            displayData(await data);
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

