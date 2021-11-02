const input = document.querySelector(".pokemonName");
const results = document.querySelector(".pokemonResults");
const submit = document.querySelector(".searchButton");

input.addEventListener("keyup", (event) => {
  fetch("/data")
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((json) => console.log(json))
    .catch((error) => console.error(error));
});
