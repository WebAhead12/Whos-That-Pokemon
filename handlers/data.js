const fs = require("fs");
const path = require("path");
const autoComplete = require("./autoComplete");

function dataHandler(request, response) {
  const filePath = path.join(__dirname, "..", "data", "pokemons.json");
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      respond.writeHead(500, { "content-type": "application/json" });
      response.end({});
    } else {
      response.writeHead(200, { "content-type": "application/json" });
      console.log(request.url);
      const data = new URLSearchParams(request.url.split("?")[1]);
      const query = data.get("q");
      console.log("query: " + query);
      let pokemons = [];
      let res = JSON.parse(file);
      pokemons = res.results.filter(
        (element) => element.name.indexOf(query) == 0
      );
      for (let i = 0; i < pokemons.length; i++) {
        if (pokemons[i].name == query) pokemons.splice(i, 1);
        console.log(pokemons[i]);
      }

      response.end(JSON.stringify(pokemons));
    }
  });
}

module.exports = dataHandler;
