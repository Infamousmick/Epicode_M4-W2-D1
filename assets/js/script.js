const auth = `j5IRLJxii9edlXAZRYFNsXLUUvFMrYGl0VA9lYlcmVljuolzHj7tDro1`;

const URL = `https://api.pexels.com/v1/search?query=`;

const getData = async (url) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: auth,
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const search = () => {
  const searchInput = document.querySelector("#search").value;
  getData(`${URL}${searchInput}`).then((res) => cyclePhotos(res));
};

const searchInput = document
  .querySelector("#search")
  .addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      search();
    }
  });

const cyclePhotos = (data) => {
  const rowContainer = document.querySelector("main .container .row ");
  rowContainer.innerHTML = "";
  data.photos.forEach((photo) => {
    createCards(photo.alt, photo.src.small, photo.photographer, rowContainer);
  });
};

const createCards = (alt, imgUrl, author, container) => {
  const card = document.createElement("div");
  card.setAttribute("class", "card col");

  const img = document.createElement("img");
  img.src = imgUrl;
  img.setAttribute("class", "card-img-top");

  const cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  const h5 = document.createElement("h5");
  h5.textContent = alt;
  h5.setAttribute("class", "card-title");

  const p = document.createElement("p");
  p.textContent = author;
  p.setAttribute("class", "card-text");

  cardBody.append(h5, p);
  card.append(img, cardBody);
  container.appendChild(card);
};
