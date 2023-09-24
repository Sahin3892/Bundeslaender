let bundeslaender = [];
let letters = [];
async function init() {
  let resp = await fetch("./src/bundesland.json");
  bundeslaender = await resp.json();
  render();
}

function render(filter) {
  let content = document.getElementById("content");
  content.innerHTML = "";

  for (let i = 0; i < bundeslaender.length; i++) {
    const land = bundeslaender[i];
    const population = (land["population"] + "").replace(".", ",");
    const firstLetter = land["name"].charAt(0);
    if (!filter || filter == firstLetter) {
      content.innerHTML += generateLand(land, population);
    }



    if (!letters.includes(firstLetter)) {
      letters.push(firstLetter);
    }
  }
  setLetters();
}

function generateLand(land, population) {
  return /*html*/ `
        <a class="content" href="${land["url"]}">
            <div>${land["name"]}</div>
            <div class="textGray">${population} Millionen</div>
        </a>
    `;
}

function setLetters() {
  let letterBox = document.getElementById("letterBox");
  letterBox.innerHTML = "";

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    letterBox.innerHTML += /*html*/ `
            <div onclick="filterLetters('${letter}')" class="letter">${letter}</div>
        `;
  }
}

function filterLetters(letter) {
  render(letter);
}
