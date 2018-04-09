var url = new URL('https://api.coinmarketcap.com/v1/ticker/?convert=EUR');

var req = new Request(url);

function getPrices() {

    fetch(req)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var template = $('#table-template').html();
            for (var i = 0; i < data.length; i++) {
                var info = Mustache.to_html(template, data[i]);
                $('#rows').append(info);
            }
            var date = new Date(data[0].last_updated * 1000);
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();
            document.getElementById("updated").innerHTML = "Last updated : " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

            for (var j = 0; j < data.length; j++) {
                var element = document.getElementsByClassName("change")[j];
                if (element.innerHTML.charAt(0).localeCompare('-')) {
                    element.style.color = "#27ae60";
                } else {
                    element.style.color = "#c0392b";
                }
            }
        })
}

function search() {

    var url = new URL('https://api.coinmarketcap.com/v1/ticker/');


    var input = document.getElementById("search").value;
    var search_currency = url + input + "/?convert=EUR";
    var request = new Request(search_currency);

    fetch(request)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var template = $('#table-template').html();
            $('#rows td').remove();
            $('#no-result p').remove();
            $("#footer").css("position", "").css("width", "").css("bottom", "");

            if (data[0] == null) {
                $('#no-result p').remove();
                var null_result = document.createElement("p");
                var div_result = document.getElementById("no-result");
                div_result.appendChild(null_result);
                null_result.innerHTML = "NO RESULTS FOUND :( ";
                $("#footer").css("position", "fixed").css("width", "100%").css("bottom", "0");

            }

            for (var i = 0; i < data.length; i++) {
                var info = Mustache.to_html(template, data[i]);

                $('#rows').append(info);
            }

            for (var j = 0; j < data.length; j++) {
                var element = document.getElementsByClassName("change")[j];
                if (element.innerHTML.charAt(0).localeCompare('-')) {
                    element.style.color = "#27ae60";
                } else {
                    element.style.color = "#c0392b";
                }
            }

            var date = new Date(data[i].last_updated * 1000);
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();
            document.getElementById("updated").innerHTML = "Last updated : " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        })
}


