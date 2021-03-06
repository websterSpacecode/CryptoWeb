var url = new URL('http://wt.kpi.fei.tuke.sk/api/article1?max=9&offset=0');

var req = new Request(url);

function getArticles() {

    fetch(req)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            document.getElementById("indicator-page").innerHTML = "1 / "
                + (Math.floor(data.meta.totalCount / 9));

            for (var i = 0; i < data.articles.length; i++) {
                var new_row = document.createElement('div');
                new_row.setAttribute("class", "col-md-6 col-lg-6 col-xl-4");
                var new_card = document.createElement('div');
                new_card.setAttribute("class", "card");
                var new_card_body = document.createElement('div');
                new_card_body.setAttribute("class", "card-body");
                var new_card_image = document.createElement('img');
                new_card_image.setAttribute("class", "card-img-top");
                new_card_image.setAttribute("width", "inherit");
                new_card_image.setAttribute("height", "300px");
                var new_card_title = document.createElement('h5');
                new_card_title.setAttribute("class", "card-title");
                var new_card_date = document.createElement('p');
                new_card_date.setAttribute("class", "card-date");
                var new_card_description = document.createElement('p');
                new_card_description.setAttribute("class", "card-text");
                var new_card_link = document.createElement('a');
                new_card_link.setAttribute("class", "btn btn-primary");
                new_card_link.innerHTML = "Read article";

                document.getElementById('cards-row').appendChild(new_row);
                new_row.appendChild(new_card);
                new_card.appendChild(new_card_image);
                new_card.appendChild(new_card_body);
                new_card_body.appendChild(new_card_title);
                new_card_body.appendChild(new_card_description);
                new_card_body.appendChild(new_card_date);
                new_card_body.appendChild(new_card_link);

                document.getElementsByClassName("card-title")[i].innerHTML = data.articles[i].title;
                document.getElementsByClassName("card-text")[i].innerHTML = "Author - " + data.articles[i].author;
                document.getElementsByClassName("card-date")[i].innerHTML = "Last updated - " + data.articles[i].lastUpdated;
                document.getElementsByClassName("btn btn-primary")[i].href = "update-article.html?id=" + data.articles[i].id;

                if (data.articles[i].imageLink != null) {
                    document.getElementsByClassName("card-img-top")[i].src = data.articles[i].imageLink;
                } else {
                    document.getElementsByClassName("card-img-top")[i].src = "img/no-image.jpg";
                }
            }
        })
}