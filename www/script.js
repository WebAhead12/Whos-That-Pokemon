const input = document.querySelector(".pokemonSearch");
const results = document.querySelector(".pokemonResults");
const resultsDiv = document.querySelector(".pokemonResults");
//search bar animations
const pokemonInput = document.querySelector(".pokemonSearch");
const animationButton = document.querySelector("#search");

input.addEventListener("keyup", (event) => {
  fetch("/data?q=" + input.value)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((json) => {
      resultsDiv.innerHTML = "";
      let length = 10;
      if (json.length < 10) length = json.length;
      for (let i = 0; i < length; i++) {
        let span = document.createElement("span");
        let br = document.createElement("br");
        span.textContent = json[i].name;
        resultsDiv.appendChild(span);
        resultsDiv.appendChild(br);

        span.addEventListener("click", (event) => {
          input.value = span.textContent;
          resultsDiv.innerHTML = "";
        });
      }
      if (!input.value.length) resultsDiv.innerHTML = "";
      console.log(json.length);
    })
    .catch((error) => console.error(error));
});

//animations for the search button
pokemonInput.addEventListener("click", () => {
  pokemonInput.classList.add("testClass");
});

animationButton.addEventListener("click", () => {
  pokemonInput.classList.remove("testClass");
});
