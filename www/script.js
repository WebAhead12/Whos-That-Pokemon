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
            pokeTypes.textContent = formatString(pokeData.types[0].type.name)
            pokeHeight.textContent = "Height: " + pokeData.height / 10.0 + "m";
            pokeWeight.textContent = "Weight: " + pokeData.weight / 10.0 + "kg"
            pokeAbilities.textContent = "Abilities: " + formatString(pokeData.abilities[0].ability.name) + "/" + formatString(pokeData.abilities[1].ability.name)

            if (pokeData.types.length == 2) pokeTypes.textContent += "/" + formatString(pokeData.types[1].type.name)
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
});

animationButton.addEventListener("click", () => {
  pokemonInput.classList.remove("testClass");
  resultsDiv.classList.add("hideResults")
  card.style.display = "none"
});
//pokemon-data => ["pokemon","data"] => "pokemon data"

const formatString = (string) => {
  let strArray = [];
  string.split("-").forEach((word, index) => {
    strArray[index] = word[0].toUpperCase() + word.slice(1, word.length);
  });
  return strArray.join(' ');
}