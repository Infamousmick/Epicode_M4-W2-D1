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
  const searchInput = document.querySelector("#search").value.trim();
  if (!searchInput) {
    console.warn("Ricerca vuota");
    return;
  }
  const rowContainer = document.querySelector("main .container .row ");
  getData(`${URL}${searchInput}`).then((res) => {
    clearScreen(rowContainer);
    const outputArr = mapData(res);
    const likeRadio = radio();
    const filteredArr = filterArr(likeRadio, outputArr);

    filteredArr.forEach((photo) => createCards(photo, rowContainer));
  });
};

const searchInput = document
  .querySelector("#search")
  .addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      search();
    }
  });

const clearScreen = (container) => {
  container.innerHTML = "";
};

const mapData = (data) => {
  const arr = data.photos.map((photo) => {
    return {
      alt: photo.alt,
      img: photo.src.small,
      author: photo.photographer,
      isLiked: photo.liked,
    };
  });

  return arr;
};

const radio = () => {
  const checkedRadio = document.querySelector(
    `input[name="fan-speed"]:checked`,
  );

  if (checkedRadio) {
    return checkedRadio.value;
  }
};

const filterArr = (liked, arr) => {
  return arr.filter((photo) => {
    if (liked === "liked") {
      return photo.isLiked === true;
    } else {
      return photo.isLiked === false;
    }
  });
};
const createCards = (data, container) => {
  const col = document.createElement("div");
  col.setAttribute("class", "col");

  const card = document.createElement("div");
  card.setAttribute("class", "card h-100");

  const img = document.createElement("img");
  img.src = data.img;
  img.setAttribute("class", "card-img-top");

  const cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  const h5 = document.createElement("h5");
  h5.textContent = data.alt;
  h5.setAttribute("class", "card-title");

  const cardFooter = document.createElement("div");
  cardFooter.setAttribute("class", "card-footer d-flex justify-content-center");

  const small = document.createElement("small");
  small.textContent = data.author;
  small.setAttribute("class", "text-muted");

  cardFooter.append(small);
  cardBody.append(h5);
  card.append(img, cardBody, cardFooter);
  col.appendChild(card);
  container.appendChild(col);
};
