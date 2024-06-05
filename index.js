const container = document.querySelector(".container");
let kanto = [];
let images = [];
let max = 20;

const fetchPkm = async () => {
  for (let i = 1; i < max; i++) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
      .then((res) => res.json())
      .then((data) => kanto.push(data));
  }
};

const display = async () => {
  await fetchPkm();
  console.log(kanto);
  const html = kanto
    .map(
      (pkm) =>
        (container.innerHTML = `
        <div class="card card${pkm.id}" id="card${pkm.id}">
        <img src="${pkm.sprites.other.dream_world.front_default}">
        <h2 id="name${pkm.id}">#${pkm.id} - ${pkm.name}</h2>
        </div>
        `)
    )
    .join("");
  container.innerHTML = html;

  kanto.forEach((pkm) => {
    const card = document.getElementById(`card${pkm.id}`);
    const otherCards = document.querySelectorAll(`.card:not(.card${pkm.id})`);
    const name = document.getElementById(`name${pkm.id}`);
    card.addEventListener("mouseover", () => {
      name.style.visibility = "visible";
      card.style.transform = "scale(1.1)";
      otherCards.forEach((othercard) => {
        othercard.style.filter = "grayscale(50%)";
      });
    });
    card.addEventListener("mouseout", () => {
      name.style.visibility = "hidden";
      card.style.transform = "";
      otherCards.forEach((card) => {
        card.style.filter = "";
      });
    });
  });
};

display();
