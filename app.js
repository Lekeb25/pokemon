const pokemonCard = document.querySelector('.card-pokemon');
const pokemonNom = document.querySelector('.pokemon-nom');
const pokemonImage = document.querySelector('.card-image');
const pokemonImageContainer = document.querySelector('.card-image-container');
const pokemonId = document.querySelector('.pokemon-id');
const pokemonType = document.querySelector('.pokemon-type');
const pokemonStats = document.querySelector('.pokemon-stats');


const typeColors = {
    electric: "#ffc800",
    normal: "#939393",
    fire: "#c21d1d",
    water: "#1d43c2",
    ice: "#1da9c2",
    rock: "#3a3b3b",
    flying: "#b4b8b8",
    grass: "#054f09",
    psychic: "#ffc6d9",
    ghost: "#561d25",
    bug: "#a2faa3",
    poison: "#795663",
    ground: "#d2b074",
    dragon: "#da627d",
    steel: "#1d8a99",
    fighting: "#2f2f2f",
    defaut: "#2a1a1f",
};

const recherchePokemon = event => {
    event.preventDefault();
    const {value} = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then((data) => data.json())
    .then((response) => pokemonData(response))
};

const pokemonData = (data) => {
    const sprite = data.sprites.front_default; 
    //ici data a une propiete sprites qui a son tour a une propiete front_default
    const { stats, types } = data;
    // console.log(data);

    pokemonNom.textContent = data.name;
    pokemonImage.setAttribute('src', sprite);
    pokemonId.textContent = `N°${data.id}`;

    funcPokemonType(types);
    funcPokemonStats(stats)
}

const funcPokemonType = types => {
    pokemonType.innerHTML = ``;
    types.forEach( type => {
        pokemonType.innerHTML = `<p><span>TYPE:</span> ${type.type.name}</p>`;
        pokemonType.style.background = typeColors[type.type.name]
    });
}

const funcPokemonStats = stats => {
    pokemonStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement('div');
        const statElementName = document.createElement('p');
        const statElementVal = document.createElement('p');

        statElementName.textContent = stat.stat.name;
        statElementVal.textContent = stat.base_stat;

        statElement.appendChild(statElementName);
        statElement.appendChild(statElementVal);
        pokemonStats.appendChild(statElement);
    });
};

const chargement = document.querySelector('loader');