var $form = $("#article-form");
var artId = stringToObject().id;

if (isFinite(artId)) {

    $.ajax({
        type: 'GET',
        url: "http://wt.kpi.fei.tuke.sk/api/article/" + artId,
        dataType: "json",
        success: function (article) {
            $("#author").val(article.author);
            $("#title").val(article.title);
            $("#imageLink").val(article.imageLink);
            $("#content").val(article.content);
            $("#tags").val(article.tags);
            $("#frmTitle").html("Edit article");
        },
        error: function (jxhr) {
            window.alert("Cannot load article.\nError: " + jxhr.status + " (" + jxhr.statusText + ")");
        }
    });
}

$form.submit(function (event) {
    event.preventDefault();
    if (isFinite(artId)) {
        prepareAndSendArticle($form, "PUT", "http://wt.kpi.fei.tuke.sk/api/article/" + artId);
    } else {
        prepareAndSendArticle($form, "POST", "http://wt.kpi.fei.tuke.sk/api/article");
    }

});

$("#btFileUpload").click(function () {
    uploadImage($('#imageLink'),
        document.getElementById('flElm').files
    );
    $('#status').show();
});

function prepareAndSendArticle($frm, method, restURL) {

    //1. Save data from form to object

    var data = {};
    $frm.serializeArray().map(
        function (item) {
            var itemValueTrimmed = item.value.trim();
            if (itemValueTrimmed) {
                data[item.name] = item.value;
            }
        }
    );

    //2. Edit data to parseable form

    if (data.tags) {
        data.tags = data.tags.split(",");
        data.tags = data.tags.map(function (tag) {
            return tag.trim()
        });
    }

    //3. Validation

    if (!data.title) {
        alert("Cannot be empty");
        return;
    }
    if (!data.content) {
        alert("Cannot be empty");
        return;
    }

    //4. Sending data

    if (window.confirm("Do you really want to save article ?")) {

        $.ajax({
            type: method,
            url: restURL,
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify(data),
            success: function (response) {
                if (response.id) {
                    window.location.href = "article.html";
                }
            },
            error: function (jxhr) {
                window.alert("Cannot save article. Error : " + status + "\n" + jxhr.statusText + "\n" + jxhr.responseText);
            }
        });
    }
}

function uploadImage($imgLinkElement, files) {
    if (files.length > 0) {
        var imgData = new FormData();
        imgData.append("file", files[0]);
        $.ajax({
            type: "POST",
            url: "http://wt.kpi.fei.tuke.sk/api/fileUpload",
            dataType: "json",
            processData: false,
            contentType: false,
            data: imgData,
            success: function (response) {
                if (response.fullFileUrl) {
                    $('#status').hide();
                    $imgLinkElement.val(response.fullFileUrl);
                }
            },
            error: function (jxhr) {
                window.alert("Cannot upload. Error :" + status + "\n" + jxhr.statusText + "\n" + jxhr.responseText);
            }
        });
    } else {
        window.alert("Select image to upload");
    }
}
