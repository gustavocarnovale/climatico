const uno = document.querySelector(".uno");
const dos = document.querySelector(".dos");
const titulo = document.querySelector(".titulo");
const tituloDos = document.querySelector(".tituloDos");
const tituloTres = document.querySelector(".tituloTres");

var options = {
  enableHighAccuracy: true,
  timeout: 6000,
  maximumAge: 0,
};

let latitud = 0;
let longitud = 0;
let ciudad = "";

navigator.geolocation.getCurrentPosition(success, error, options);

function success(position) {
  var coordenadas = position.coords;
  console.log("Tu posición actual es:");
  console.log("Latitud : " + coordenadas.latitude);
  console.log("Longitud: " + coordenadas.longitude);
  console.log("Más o menos " + coordenadas.accuracy + " metros.");
  latitud = coordenadas.latitude;
  longitud = coordenadas.longitude;

  urlCl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    latitud +
    "&lon=" +
    longitud +
    "&lang=es&appid=4452498fac43e15d8736c08eb4b37050&units=metric";
  fetch(urlCl)
    .then((response) => response.json())
    .then((data) => {
      console.log("Gracias por utlizar Climatico!");
      titulo.innerHTML +=
        "<div class='col-sm-12 col-md-12 col-lg-12 col-xl-12 fuente'><p>Tu ubicacion actual: " +
        data.name +
        " - " +
        ciudad +
        "</p></div>";
      tituloTres.innerHTML +=
        "<div class='col col-sm-12 col-md-12 col-lg-12 col-xl-12 fuente'><img class='fondoIcono' src='http://openweathermap.org/img/wn/" +
        data.weather[0].icon +
        ".png'/></div>";
      tituloTres.innerHTML +=
        "<div class='col col-sm-12 col-md-12 col-lg-12 col-xl-12 fuente'><p>" +
        data.weather[0].description +
        " </p></div>";
      uno.innerHTML +=
        "<div class= 'col col-sm-3 col-md-3 col-lg-3 col-xl-3 fuente'><p >Temperatura actual: " +
        Math.round(data.main.temp) +
        " °C</p></div>";
      uno.innerHTML +=
        "<div class='col col-sm-3 col-md-3 col-lg-3 col-xl-3 fuente'><p>Maxima: " +
        Math.round(data.main.temp_max) +
        "°C</p></div>";
      uno.innerHTML +=
        "<div class='col col-sm-3 col-md-3 col-lg-3 col-xl-3 fuente'><p>Minima: " +
        Math.round(data.main.temp_min) +
        "°C</p></div>";
      uno.innerHTML +=
        "<div class='col col-sm-3 col-md-3 col-lg-3 col-xl-3 fuente'><p>Humedad: " +
        data.main.humidity +
        "%</p></div>";
    });

  var platform = new H.service.Platform({
    apikey: "Pxv2IuJ72cpY9D4AgsobbOpYUZMYLJ0x1IcQvsy0mis",
  });

  var defaultLayers = platform.createDefaultLayers();

  var map = new H.Map(
    document.querySelector("#mapContainer"),
    defaultLayers.vector.normal.map,
    {
      zoom: 15,
      center: { lat: coordenadas.latitude, lng: coordenadas.longitude },
    }
  );
  (coords = { lat: coordenadas.latitude, lng: coordenadas.longitude }),
    (marker = new H.map.Marker(coords));

  map.addObject(marker);
  map.setCenter(coords);
  var service = platform.getSearchService();

  service.reverseGeocode(
    {
      at: coordenadas.latitude + "," + coordenadas.longitude,
    },
    (result) => {
      result.items.forEach((item) => {
        ciudad = item.address.state;
        console.log(ciudad);
      });
    },
    alert
  );
}

function error(error) {
  console.warn("ERROR(" + error.code + "): " + error.message);
}
