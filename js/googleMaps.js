function initMap() {
    var myLatLng = {lat: 48.697596, lng: 21.233448};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'CryptoWeb office'
    });
}