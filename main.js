const API_POKEMON = "https://pokeapi.co/api/v2/pokemon";
let pokemonList = [];

function getAllPokemon() {
    fetch(`${API_POKEMON}?limit=160`)
        .then(response => response.json())
        .then(function (pokemones) {
            pokemonList = pokemones.results.map((e,i) => {
                const pokemon = {
                    name : e.name,
                    id   : i + 1
                }
                getPokemonByUrl(e.url, pokemon.id);
                return pokemon;
            })
        });
}

function getPokemonByUrl(url, id) {
    fetch(url)
        .then(response => response.json())
        .then(pokemon => {
            const elements = url.split("/");
            let id = elements[elements.length-2];
            const htmlContent = `<div class="col s6 m2">
            <div class="card">
                <div class="card-image">
                    <img src='${pokemon.sprites.front_default}'>
                    <a class="btn-floating halfway-fab waves-effect waves-light red modal-trigger" href="#modal1" onclick="openModal(${id})">
                        <i class="material-icons">add</i>
                    </a>
                </div>
                <div class="card-content">
                    <span class="card-title">${pokemon.name}</span>
                    <span class="red-text fz-13">Tipo:</span>
                    <p id="typeDescription${id}" class="fz-12"><p>
                </div>
            </div>
        </div>`
            document.querySelector(".container-pokemones").innerHTML += htmlContent;
            getPokemonId(id)
        });
}

function getPokemonId(id) {
    fetch(`${API_POKEMON}/${Number(id)}`)
        .then(response => response.json())
        .then(function (pokemon) {
           const index = id-1;
           pokemonList[index].weight = pokemon.weight/10;
           pokemonList[index].types = pokemon.types.map(e =>e.type.name).join(', ');
           pokemonList[index].abilities = pokemon.abilities.map(e =>e.ability.name).join(', ');
           pokemonList[index].height = pokemon.height;
           document.querySelector(`#typeDescription${id}`).innerHTML = pokemonList[index].types;
        });
}

function openModal(id) {
    const htmlContent = `<h4>Pokemon ${pokemonList[id-1].name}</h4>
    <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s6">
          <input id="types" type="text" class="validate" value="${pokemonList[id-1].types}">
          <label for="types" class="active">Tipos</label>
        </div>
        <div class="input-field col s6">
          <input id="abilities" type="text" class="validate" value="${pokemonList[id-1].abilities}">
          <label for="abilities" class="active">Habilidades</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
            <input id="weight" type="text" class="validate" value="${pokemonList[id-1].weight} Kg">
            <label for="weight" class="active">Peso</label>
        </div>
        <div class="input-field col s6">
            <input id="height" type="text" class="validate" value="${pokemonList[id-1].height}">
            <label for="height" class="active">Altura</label>
        </div>
      </div>
    </form>
  </div>
        `
    document.querySelector(".modal-content-pokemon").innerHTML = htmlContent;
}

function init() {
    document.addEventListener('DOMContentLoaded', function () {
        var sidenav = document.querySelectorAll('.sidenav');
        var modal = document.querySelectorAll('.modal');
        var instancesSidenav = M.Sidenav.init(sidenav);
        var instancesModal = M.Modal.init(modal);
    });
      getAllPokemon();
}

init();