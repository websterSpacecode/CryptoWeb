var counter = 1;

function increment() {
    counter++;
}

function decrement() {
    if (counter > 1) {
        counter--;
    }
}

function filterNews() {

    var url = new URL('https://newsapi.org/v2/everything?q=Cryptocurrency&sortBy=popularity&pageSize=24');

    var date_from = document.getElementById("options-calendar-value-from").value;
    var date_to = document.getElementById("options-calendar-value-to").value;

    url.searchParams.append("from", date_from);
    url.searchParams.append("to", date_to);
    url.searchParams.append("page", counter);

    url.searchParams.append("apikey", "81583c62d987471a90e66bff73cd6d5d");

    var req = new Request(url);

    fetch(req)
        .then(function (response) {
            //console.log(response.json());
            return response.json();
        })
        .then(function (data) {
                document.getElementById("indicator-page").innerHTML =  url.searchParams.get("page") + " / "
                    + (Math.floor(data.totalResults / 21));

                for (var i = 0; i < data.articles.length; i++) {
                    document.getElementsByClassName("card-title")[i].innerHTML = data.articles[i].title;
                    document.getElementsByClassName("card-text")[i].innerHTML = data.articles[i].description.substring(0, 200);
                    document.getElementsByClassName("btn btn-primary")[i].href = data.articles[i].url;
                    if (data.articles[i].urlToImage != null) {
                        document.getElementsByClassName("card-img-top")[i].src = data.articles[i].urlToImage;
                    } else {
                        document.getElementsByClassName("card-img-top")[i].src = "img/no-image.jpg";
                    }

                }
            }
        )
}
