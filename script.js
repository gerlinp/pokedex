const poke_container = document.querySelector('#poke-container')
const pokemon_count = 151;
let pokemon_list = []

// pokemon type colors
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


// function that appends pokemon to page based on page and list.
const showPokemon = async (list, page) => {
    let start = (page * 12 ) - 12
    let end = (page * 12)
    poke_container.innerHTML = '';
    for (let i = 0; i < end; i++) {
         if (i >= pokemon_list.length) {
            break;
        } else if ( i >= start && i <= end) {
            await getPokemon(i)
        } else if (pokemon_list.length == 0) {
            poke_container.innerHTML = `<h2 class="noResult">pokemon was not found</h2>`;
        }
    }
    pagination();
}

//pagination

function pagination() {
    const pages = document.querySelector('#pages')
    let pageButtons = Math.ceil(pokemon_list.length / 12);
    pages.innerHTML = '';
    for (let i = 1; i <= pageButtons; i++) {
        pages.innerHTML += `
        <li>
           <button id="btn-${i}" type="button">${i}</button>
        </li>`
    };
};

const main_types = Object.keys(colors)
const fetchPokemons = async () => {
    for(let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i)
    }
}



const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    pokemon_list.push(data)
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

fetchPokemons()
showPokemon(pokemon_list,1)