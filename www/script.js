//pokemon search div
const input = document.querySelector(".pokemonSearch");
const results = document.querySelector(".pokemonResults");
const resultsDiv = document.querySelector(".pokemonResults");
//search bar animations
const pokemonInput = document.querySelector(".pokemonSearch");
const animationButton = document.querySelector("#search");
//pokemon info div
const card = document.querySelector(".card");
const img = document.querySelector(".pokemonImg");
const allTd = document.querySelectorAll("td");
const pokeName = document.querySelector(".name");
const pokeTypes = document.querySelector(".types");
const pokeHeight = document.querySelector(".height");
const pokeWeight = document.querySelector(".weight");
const pokeAbilities = document.querySelector(".abilities");
const pokeType1 = document.querySelector(".type1")
const pokeType2 = document.querySelector(".type2")
//pokemon types colors
const typeColors = {
  grass: (a = 1) => `rgba(120, 197, 128,${a})`,
  fire: (a = 1) => `rgba(240, 128, 48,${a})`,
  water: (a = 1) => `rgba(104, 144, 240,${a})`,
  bug: (a = 1) => `rgba(168, 184, 32,${a})`,
  normal: (a = 1) => `rgba(168, 168, 120,${a})`,
  poison: (a = 1) => `rgba(160, 64, 160,${a})`,
  electric: (a = 1) => `rgba(248, 208, 48,${a})`,
  ground: (a = 1) => `rgba(224, 192, 104,${a})`,
  fairy: (a = 1) => `rgba(238, 153, 172,${a})`,
  fighting: (a = 1) => `rgba(192, 48, 40,${a})`,
  psychic: (a = 1) => `rgba(248, 88, 136,${a})`,
  rock: (a = 1) => `rgba(184, 160, 56,${a})`,
  ghost: (a = 1) => `rgba(112, 88, 152,${a})`,
  ice: (a = 1) => `rgba(152, 216, 216,${a})`,
  dragon: (a = 1) => `rgba(112, 56, 248,${a})`,
};

input.addEventListener("keyup", (event) => {
  fetch("/data?q=" + input.value)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((pokemon) => {
      resultsDiv.innerHTML = "";
      for (let i = 0; i < pokemon.length; i++) {
        let span = document.createElement("span");
        let br = document.createElement("br");
        span.textContent = formatString(pokemon[i].name);
        span.style.cursor = "pointer";
        resultsDiv.appendChild(span);
        resultsDiv.appendChild(br);

        span.addEventListener("click", (event) => {
          input.value = span.textContent;
          resultsDiv.innerHTML = "";
          fetch(pokemon[i].url).then((response) => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
          }).then(pokeData => {
            img.src = pokeData.sprites.front_default;
            pokeName.textContent = formatString(pokeData.name);
            pokeHeight.textContent = "Height: " + pokeData.height / 10.0 + "m";
            pokeWeight.textContent = "Weight: " + pokeData.weight / 10.0 + "kg"

            pokeAbilities.textContent = "Abilities: " + formatString(pokeData.abilities[0].ability.name) + "/" + formatString(pokeData.abilities[1].ability.name)

            // pokeTypes.textContent = formatString(pokeData.types[0].type.name)
            // if (pokeData.types.length == 2) pokeTypes.textContent += "/" + formatString(pokeData.types[1].type.name)

            pokeType1.textContent = formatString(pokeData.types[0].type.name)
            pokeType1.style.backgroundColor = typeColors[pokeData.types[0].type.name](0.5);
            pokeType1.style.borderColor = typeColors[pokeData.types[0].type.name]();
            if (pokeData.types.length == 2) {
              pokeType2.textContent = " " + formatString(pokeData.types[1].type.name)
              pokeType2.style.backgroundColor = typeColors[pokeData.types[1].type.name](0.5);
              pokeType2.style.borderColor = typeColors[pokeData.types[1].type.name]();
            }
            allTd.forEach((element, index) => {
              element.textContent = pokeData.stats[index].base_stat;
            })
          }).catch((error) => console.error(error));
          card.style.display = "inline-block"
        });
      }
      if (!input.value.length) {
        resultsDiv.innerHTML = "";
        card.style.display = "none"
      }
    })
    .catch((error) => console.error(error));
});

//animations for the search button
pokemonInput.addEventListener("click", () => {
  pokemonInput.classList.add("testClass");
  resultsDiv.classList.remove("hideResults")
  card.style.display = "none"
});

animationButton.addEventListener("click", () => {
  pokemonInput.classList.remove("testClass");
  resultsDiv.classList.add("hideResults")
  card.style.display = "none"
});

//pokemon-data => ["pokemon","data"] => "pokemon data" => "Pokemon Data"
const formatString = (string) => {
  let strArray = [];
  string.split("-").forEach((word, index) => {
    strArray[index] = word[0].toUpperCase() + word.slice(1, word.length);
  });
  return strArray.join(' ');
}