var counter = 0;
var indicator_counter = 1;

function increment() {
    counter += 9;
    indicator_counter++;
}

function decrement() {
    if (indicator_counter > 1) {
        counter -= 9;
        indicator_counter--;
    }
}

function getArticlesFilter() {

    var url = new URL('http://wt.kpi.fei.tuke.sk/api/article?max=9');

    url.searchParams.append("offset", counter);

    var req = new Request(url);

    fetch(req)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
                document.getElementById("indicator-page").innerHTML = indicator_counter + " / "
                    + (Math.floor(data.meta.totalCount / 9));

                for (var i = 0; i < data.articles.length; i++) {
                    document.getElementsByClassName("card-title")[i].innerHTML = data.articles[i].title;
                    document.getElementsByClassName("card-text")[i].innerHTML = data.articles[i].author;
                    document.getElementsByClassName("btn btn-primary")[i].href = data.articles[i].url;

                    if (data.articles[i].imageLink != null) {
                        document.getElementsByClassName("card-img-top")[i].src = data.articles[i].imageLink;
                    } else {
                        document.getElementsByClassName("card-img-top")[i].src = "img/no-image.jpg";
                    }
                }
            }
        )
}