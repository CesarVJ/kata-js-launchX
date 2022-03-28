document.getElementById("statsTitle").hidden = true;

const fetchPokemon = () => {
  const pokeNameInput = document.getElementById("pokeName");
  let pokeName = pokeNameInput.value;
  pokeName = pokeName.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
  fetch(url)
    .then((res) => {
      if (res.status != "200") {
        console.log(res);
        document.getElementById("statsTitle").hidden = true;
        document.querySelector("#chart").innerHTML = "";
        pokeImage("./images/pokemon-sad.png");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
        console.log(data);
        let pokeImg = data.sprites.front_default;
        pokeImage(pokeImg);
        setInfo(data);
      }
    });
};

function setInfo(data) {
  const name = data.name;
  const pokemonId = data.id;
  const height = data.height;
  const weight = data.weight;
  let abilities = data.abilities;
  let types = data.types;
  let stats = data.stats;

  document.getElementById("pokeId").innerHTML = pokemonId;
  document.getElementById("name").innerHTML = name.toUpperCase();
  document.getElementById("height").innerHTML = height;
  document.getElementById("weight").innerHTML = weight;
  document.getElementById("statsTitle").hidden = false;

  setTypes(types);
  fillMovements(abilities);
  fillStats(stats);
}

function setTypes(types) {
  let typesContainer = document.getElementsByClassName("types")[0];
  typesContainer.innerHTML = "";
  types.forEach((t) => {
    let typeNode = document.createElement("div");
    typeNode.className = "type";
    typeNode.innerHTML = t.type.name;
    typesContainer.appendChild(typeNode);
  });
}

function fillMovements(abilities) {
  const abilitiesTable = document.getElementsByClassName("abilitiesTable")[0];
  abilitiesTable.innerHTML = "";
  abilities.forEach((ability) => {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.innerHTML = ability.ability.name;
    tr.appendChild(td);
    abilitiesTable.appendChild(tr);
  });
}

function fillStats(stats) {
  document.querySelector("#chart").innerHTML = "";
  let [hp, attack, defense, specialAttack, specialDefense, speed] = stats;
  var options = {
    series: [
      {
        name: "Series 1",
        data: [
          hp.base_stat,
          attack.base_stat,
          defense.base_stat,
          specialAttack.base_stat,
          specialDefense.base_stat,
          speed.base_stat,
        ],
      },
    ],
    chart: {
      height: 350,
      type: "radar",
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      radar: {
        size: 140,
        polygons: {
          strokeColors: "#e9e9e9",
          fill: {
            colors: ["#f8f8f8", "#fff"],
          },
        },
      },
    },
    title: {
      text: "",
      align: "center",
    },
    colors: ["#FF4560"],
    markers: {
      size: 4,
      colors: ["#fff"],
      strokeColor: "#FF4560",
      strokeWidth: 2,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
    xaxis: {
      categories: [
        "Vida",
        "Ataque",
        "Defensa",
        "Ataque especial",
        "Defensa especial",
        "Velocidad",
      ],
    },
    yaxis: {
      tickAmount: 7,
      labels: {
        formatter: function (val, i) {
          if (i % 2 === 0) {
            return val;
          } else {
            return "";
          }
        },
      },
    },
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}

const pokeImage = (url) => {
  const pokePhoto = document.getElementById("pokeImg");
  pokePhoto.src = url;
};
