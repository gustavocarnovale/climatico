const icono = document.querySelector("#icono")
const infoCiudad = document.querySelector("#ciudad")
const temperatura = document.querySelector("#temperatura")
const descripcion = document.querySelector("#descripcion")
const uno = document.querySelector(".uno")
const dos = document.querySelector(".dos")




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

    urlCl="https://api.openweathermap.org/data/2.5/weather?lat=" + latitud + "&lon=" + longitud + "&lang=es&appid=4452498fac43e15d8736c08eb4b37050&units=metric"
    fetch(urlCl)
      .then((response) => response.json())
      .then((data) => {
            console.log(data)
            console.log()           
            console.log(data.main.temp_max)
            console.log(data.main.temp_min)
            console.log(data.main.pressure)
            console.log(data.main.humidity)
            console.log(data.weather[0].icon)
            //icono.setAttribute("src", "http://openweathermap.org/img/wn/" +data.weather[0].icon+".png")
            uno.innerHTML +="<div class='cenIcoDes'><p><img class='fondoIcono' src='http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png'/></p><p class= 'col-sm-6 col-md-6 col-lg-6 col-xl-6 fuente'>" + data.weather[0].description+ " </p></div>";
            uno.innerHTML +="";
            dos.innerHTML +="<p class= 'col-sm-6 col-md-6 col-lg-6 col-xl-6 fuente'>Temperatura actual: " + Math.round(data.main.temp) + " °C</p>";

            //uno.innerHTML +="<p class= 'col-sm-4 col-md-6 fuente' > Humedad:  " + data.main.humidity + " %</p>";
            //dos.innerHTML="<p class= 'col-sm-6 col-md-6 fuente' > Humedad:  " + data.main.humidity + " %</p>";
           
            
          });

    
  var platform = new H.service.Platform({
    apikey: "Pxv2IuJ72cpY9D4AgsobbOpYUZMYLJ0x1IcQvsy0mis",
  });

  // Obtain the default map types from the platform object:
  var defaultLayers = platform.createDefaultLayers();

  // Instantiate (and display) a map object:
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

  // Add the marker to the map and center the map at the location of the marker:
  map.addObject(marker);
  map.setCenter(coords);

  // Get an instance of the search service:
  var service = platform.getSearchService();

  // Call the reverse geocode method with the geocoding parameters,
  // the callback and an error callback function (called if a
  // communication error occurs):
  service.reverseGeocode(
    {
      at: coordenadas.latitude + "," + coordenadas.longitude,
    }, 
    (result) => {
      result.items.forEach((item) => {
        // Assumption: ui is instantiated
        // Create an InfoBubble at the returned location with
        // the address as its contents:
      //  ui.addBubble(
      //    new H.ui.InfoBubble(item.position, {
      //      content: item.address.label,
      //    })
      //  );

        ciudad = item.address.state
      console.log(ciudad)
      });
    },
    alert
  );
}

function error(error) {
  console.warn("ERROR(" + error.code + "): " + error.message);
}

//  const url = "https://ws.smn.gob.ar/map_items/forecast/1"
//  const request = new XMLHttpRequest();
//  request.open('GET', url)
//  window.Request.json(url, (datos) =>
//  {
//    console.log(datos)
//  })
//console.log(JSON.stringify(data[0].name))

