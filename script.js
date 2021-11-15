const poke_container = document.querySelector('#poke-container')
const pokemon_count = 897;
const pokemonList = []


// Pokemon type colors
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

// Pagination function that creates and appends elements needed for pagination buttons

function pagination() {
    let pageButtons = Math.ceil(pokemonList.length / 12);
    let pages = document.querySelector('.pages')
    pages.innerHTML = '';
    for (let i = 1; i <= pageButtons; i++) {
        pages.innerHTML += `
        <li>
           <button id="btn-${i}" type="button">${i}</button>
        </li>`
    };
};





const main_types = Object.keys(colors)

const fetchPokemons = async (page) => {
    let start = (page * 12) - 11
    let end = (page * 12)
    poke_container.innerHTML = '';
    for(let i = start; i <= end; i++) {
        await getPokemon(i)
    }
    pagination();
}



const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    pokemonList.push(data)
    createPokemonCard(data)
}



const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const id = pokemon.id.toString().padStart(3, '0')
    const poke_types = pokemon.types.map(type => type.type.name)
    const type = main_types.find(type => poke_types.indexOf(type) > -1)
    const color = colors[type]
    pokemonEl.style.backgroundColor = color
    const pokemonInnerHTML = `
   
        <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name}">
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>`

    pokemonEl.innerHTML = pokemonInnerHTML

    poke_container.appendChild(pokemonEl)
} 

fetchPokemons(1)
