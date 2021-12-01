//javascript.js
/**
 *
 * Função que é chamada quando o mapa é iniciado
 */
var myLatLng = { lat: -19.8573741, lng: -43.9108319 };
var mapOptions = {
    center: myLatLng,
    zoom: 15.3,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

//criando o mapa
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//Criando objeto de direcao para usar no resultado
var directionsService = new google.maps.DirectionsService();

//criando objeto para exibir a rota
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);


//funcao para calcular rota
function calcRoute() {
    //criando requisiacao
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.METRICO
    }

    //metodo de passagem da requisicao
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Obtenha distância e tempo
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>Partida: " + document.getElementById("from").value + ".<br />Destino: " + document.getElementById("to").value + ".<br /> Distancia ate o posto <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Tempo estimado <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

            //exibindo rota
            directionsDisplay.setDirections(result);
        } else {
            //
            directionsDisplay.setDirections({ routes: [] });
            //centraliazando o mapa
            map.setCenter(myLatLng);

            //messagem de erro
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Nao foi possivel calcular a rota</div>";
        }
    });

}



//preenchimento automatico
var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
