const submitButtom = document.getElementById("submitButtom");
const modalButtom = document.querySelector(".modal-buttom-close");
const modalErrorDom = document.querySelector(".modal-error");
const itemClose = document.getElementById("#button-item");

const add = (data) => {
  console.log(data);
  let containerCity = document.createElement("div");
  containerCity.classList.add("item-container");
  const resultcontainerDom = document.querySelector(".result-container");

  resultcontainerDom.appendChild(containerCity)(
    (containerCity.innerHTML = `
      <div class="icon-container">
      <img class="icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" >
      <h1 id="city-name">${data.name}</h1>
      </div>
      <div class="data-container">
      <p>Weather: ${data.weather[0].main}</p>
      <p>Details: ${data.weather[0].description}</p>
      <p>Temperature:  ${data.main.temp}°C</p>
      <p>Longitud: ${data.coord.lon}</p>
      <p>Latitud: ${data.coord.lat}</p>
      <button id=button-item type="button">X</button>
      </div>
      `)
  );
};

const fetchWeather = async () => {
  let key = "62e6f90a3ac0fe0a0d4005ae5d3f14b9";
  let inputCity = document.getElementById("city").value;

  if (!inputCity) {
    alert("please enter a city");
    return;
  } else {
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric&appid=${key}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw modalErrorDom.classList.add("display");
        }
      })
      .then((data) => {
        add(data);
      })
      .catch((err) => console.log(err));
    document.getElementById("city").value = "";
  }
};

const closeModal = (e) => {
  if (e.target.classList.contains("modal-buttom-close")) {
    e.target.parentNode.classList.remove("display");
  }
};

const closeItem = (e) => {
  if (e.target.id === "button-item") {
    e.target.parentNode.parentNode.remove();
  }
};

window.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    fetchWeather();
  }
});

window.addEventListener("click", closeItem);

submitButtom.addEventListener("click", fetchWeather);
modalButtom.addEventListener("click", closeModal);
modalButtom.addEventListener("click", closeModal);
