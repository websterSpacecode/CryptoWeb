var url = new URL('http://wt.kpi.fei.tuke.sk/api/article/');

var qs = new Querystring();
var v1 = qs.get("id");

var artId = queryString2obj().id;

function deleteArticle() {
    if (window.confirm("Do you really want to delete this article ?")) {

        $.ajax({
            type: 'DELETE',
            url: "http://wt.kpi.fei.tuke.sk/api/article/" + artId,

            success: function () {
                window.alert("Article deleted.");
                window.location.href = "article.html";
            },
            error: function (jxhr) {
                errorAlert("Cannot delete article", jxhr);
            }
        });
    }
}

