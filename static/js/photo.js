$(document).ready(function () {
    show_photo()
});

function show_photo() {
    $.ajax({
        type: "GET",
        url: "/showphoto",
        data: {},
        success: function (response) {
            console.log(response)
            let rows = response['photo'];
            for (let i = rows.length-1; i >-1; i--) {
                let comment = rows[i]['comment'];
                let title = rows[i]['title'];
                let file = rows[i]['file_name'];
                let file_path = "/static/upload/"+file
                console.log(file_path)
                let temp_html = `<div class="col">
                                    <div class="card">
                                        <img src="${file_path}" width="300" class="card-img-top" alt="...">
                                        <div class="card-body">
                                            <h5 class="card-title">${title}</h5>
                                            <p class="card-text">${comment}</p>
                                        </div>
                                    </div>
                                </div>`;
                $('#photo-box').append(temp_html);

            }

        }
    });
}
